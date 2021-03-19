import Parser from 'rss-parser';
import { NowRequest, NowResponse } from '@vercel/node';
import { decode } from 'html-entities';

const parser = new Parser({
  timeout: 10000,
  headers: {
    Accept: 'application/rss+xml, application/xml, application/atom+xml;charset=UTF-8',
  },
});

export default async function checkItems(req: NowRequest, res: NowResponse) {
  try {
    const {
      query: { url, company },
    } = req;
    const urlString = Array.isArray(url) ? url[0] : url;
    const companyString = Array.isArray(company) ? company[0] : company;
    const rssItems = await getRSS(urlString, companyString);
    res.status(200).json({
      rssItems,
    });
  } catch (err) {
    console.error(err);
  }
}

async function getRSS(url: string, company: string) {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.reduce<Array<Record<string, string>>>((acc, item) => {
      acc.push({
        title: decode(item.title),
        link: item.link,
        company,
        publishDate: new Date(item.pubDate).getTime().toString(),
      });
      return acc;
    }, []);

    return items.sort((a, b) => parseInt(b.publishDate) - parseInt(a.publishDate));
  } catch (err) {
    console.log(`${url} is maybe broken.(getRSS)`);
    console.log(err);
    return [];
  }
}
