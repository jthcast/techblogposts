import { NowRequest, NowResponse } from '@vercel/node';
import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';

interface Query {
  title: string;
  isShow: boolean;
  dataType: string;
  publishDate: number;
}

const search = async (req: NowRequest, res: NowResponse) => {
  try {
    const query = req.query.query;
    const { body } = await client.search<SearchResponse<Query>>({
      index,
      size: 10000,
      body: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  dataType: 'post',
                },
              },
              {
                term: {
                  isShow: true,
                },
              },
            ],
            must: [
              {
                match: {
                  title: query,
                },
              },
            ],
          },
        },
        sort: [
          {
            publishDate: {
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

export default search;
