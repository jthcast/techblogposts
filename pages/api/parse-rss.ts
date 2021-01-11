import Parser from 'rss-parser';
import {
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  TransactWriteItemsCommand,
  TransactWriteItemsInput,
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
  // timeout: 5000,
});

async function getRSS(url: string) {
  // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  const CORS_PROXY = '';
  const feed = await parser.parseURL(`${CORS_PROXY}${url}`);
  const company = feed.title;
  const items = feed.items.reduce<Array<Record<string, string | number>>>((acc, item) => {
    acc.push({
      title: item.title,
      link: item.link,
      company,
      timestamp: new Date(item.pubDate).getTime().toString(),
    });
    return acc;
  }, []);

  return items;
}

async function getDbItems(company: string | number) {
  return 'TEMP';
}

async function checkItems(req: NowRequest, res: NowResponse) {
  const url = 'https://jthcast.dev/rss.xml';
  const items = await getRSS(url);
  // if (items[0].company) {
  //   await getDbItems(items[0].company);
  //   //하나씩 비교해서 put, count해서 5개 이상 이면 writeAllRss
  //   console.log('getDbItems');
  //   return;
  // }
  //데이터가 없으면 writeAllRss
  await writeAllRSS(items);
  res.status(200).json('Complete');
}

async function writeAllRSS(items: Record<string, string | number>[]) {
  try {
    // if (req.method === 'POST') {
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
            SET title = if_not_exists(title, :title) AND
            SET company = if_not_exists(company, :company) AND
            SET timestamp = if_not_exists(timestamp, :timestamp) AND
            SET viewCount = if_not_exists(viewCount, :viewCount)
          `,
          ExpressionAttributeValues: {
            // ':link': { S: item.link },
            ':title': { S: item.title },
            ':company': { S: item.company },
            ':timestamp': { N: item.timestamp },
            ':viewCount': { N: '0' },
          },
        },
      });
      return acc;
    }, []);
    const params: TransactWriteItemsInput = {
      TransactItems: transactItems,
    };
    const results = await dbclient.send(new TransactWriteItemsCommand(params));
    // }
  } catch (err) {
    console.error(err);
  }
}

export default checkItems;
