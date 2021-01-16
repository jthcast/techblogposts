import Parser from 'rss-parser';
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  TransactWriteItemsCommand,
  TransactWriteItemsInput,
  UpdateItemCommand,
  UpdateItemInput,
} from '@aws-sdk/client-dynamodb';
import { NowRequest, NowResponse } from '@vercel/node';

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY,
  },
});
const parser = new Parser({
  timeout: 3000,
});

export default async function checkItems(req: NowRequest, res: NowResponse) {
  try {
    if (req.method === 'POST') {
      const clientKey = req.headers.authorization;
      if (clientKey !== process.env.API_KEY) {
        res.status(200).json('unauthorized');
        return;
      }
      const startTime = new Date().getTime();
      const blogs = await getBlogs();
      let newItemAdded = 0;
      for (const blog of blogs.Items) {
        const url = blog.link.S;
        const company = blog.company.S;
        const rssItems = await getRSS(url, company);
        const companyPostLinks = await getCompanyPostLinks(company);
        const newRssItems = rssItems.reduce((acc, item) => {
          const rssItemLink = item.link;
          if (!companyPostLinks.includes(rssItemLink)) {
            acc.push(item);
          }
          return acc;
        }, []);
        while (newRssItems.length > 0) {
          newItemAdded += await writeItems(newRssItems.splice(0, 25));
        }
      }
      const endTime = new Date().getTime();
      await writeParsingDuration(endTime - startTime);
      res.status(200).json({
        newItemAdded,
      });
    } else {
      res.status(200).json('unauthorized');
      return;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getBlogs() {
  try {
    const params: QueryCommandInput = {
      TableName: process.env.DB_TABLE_NAME,
      KeyConditionExpression: 'dataType = :blog',
      ExpressionAttributeValues: {
        ':blog': { S: 'blog' },
      },
    };
    const results = await dbclient.send(new QueryCommand(params));
    return results;
  } catch (err) {
    console.error(err);
  }
}

async function getRSS(url: string, company: string) {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.reduce<Array<Record<string, string>>>((acc, item) => {
      acc.push({
        title: item.title,
        link: item.link,
        company,
        publishDate: new Date(item.pubDate).getTime().toString(),
      });
      return acc;
    }, []);

    return items;
  } catch (err) {
    // console.log(`${url} is maybe broken.`);
    // console.log(err);
  }
}

async function getCompanyPostLinks(company: string) {
  try {
    const params: QueryCommandInput = {
      TableName: process.env.DB_TABLE_NAME,
      KeyConditionExpression: 'dataType = :post',
      FilterExpression: 'company = :company',
      ExpressionAttributeValues: {
        ':post': { S: 'post' },
        ':company': { S: company },
      },
    };
    const results = await dbclient.send(new QueryCommand(params));
    const linkArray = results.Items.reduce((acc, item) => {
      acc.push(item.link.S);
      return acc;
    }, []);

    return linkArray;
  } catch (err) {
    console.error(err);
  }
}

async function writeItems(items: Record<string, string | number>[]) {
  try {
    const transactItems = items.reduce((acc, item) => {
      acc.push({
        Update: {
          Key: {
            dataType: {
              S: 'post',
            },
            link: {
              S: item.link,
            },
          },
          TableName: process.env.DB_TABLE_NAME,
          UpdateExpression: `
            SET title = if_not_exists(title, :title),
            company = if_not_exists(company, :company),
            publishDate = if_not_exists(publishDate, :publishDate),
            viewCount = if_not_exists(viewCount, :viewCount)
          `,
          ExpressionAttributeValues: {
            ':title': { S: item.title },
            ':company': { S: item.company },
            ':publishDate': { N: item.publishDate },
            ':viewCount': { N: '0' },
          },
        },
      });
      return acc;
    }, []);
    const params: TransactWriteItemsInput = {
      TransactItems: transactItems,
    };
    await dbclient.send(new TransactWriteItemsCommand(params));

    return items.length;
  } catch (err) {
    console.error(err);
  }
}

async function writeParsingDuration(duration: number) {
  try {
    const date = new Date(duration);
    const dateString = `${date.getUTCHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
    const currentDate = new Date();
    const currentUTCDate = currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(currentUTCDate + KR_TIME_DIFF);

    const params: UpdateItemInput = {
      TableName: process.env.DB_TABLE_NAME,
      UpdateExpression: `
        SET timeDuration = if_not_exists(timeDuration, :timeDuration),
        parsedDate = if_not_exists(parsedDate, :parsedDate)
      `,
      ExpressionAttributeValues: {
        ':timeDuration': { S: dateString },
        ':parsedDate': { S: kr_curr.toString() },
      },
      Key: {
        dataType: { S: 'config' },
        link: { S: 'parsingDuration' },
      },
    };
    await dbclient.send(new UpdateItemCommand(params));
  } catch (err) {
    console.error(err);
  }
}
