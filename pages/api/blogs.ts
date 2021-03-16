import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';
import { NowRequest, NowResponse } from '@vercel/node';

interface Query {
  cron: boolean;
  dataType: string;
}

const blogs = async (req: NowRequest, res: NowResponse) => {
  try {
    const { body } = await client.search<SearchResponse<Query>>({
      index,
      size: 10000,
      body: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  dataType: 'blog',
                },
              },
              {
                term: {
                  cron: true,
                },
              },
            ],
          },
        },
        sort: [
          {
            lastUpdated: {
              order: 'desc',
            },
          },
        ],
      },
    });

    res.status(200).json(body.hits.hits);
  } catch (err) {
    console.error(err);
  }
};

export default blogs;
