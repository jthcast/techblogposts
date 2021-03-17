import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';
import { NowRequest, NowResponse } from '@vercel/node';

interface Query {
  dataType: string;
  isShow: boolean;
  publishDate: {
    order: string;
  };
}

const posts = async (req: NowRequest, res: NowResponse) => {
  try {
    let query = {
      index,
      size: 10,
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
          },
        },
        sort: [
          {
            publishDate: {
              order: 'desc',
            },
          },
          {
            'id.keyword': {
              order: 'asc',
            },
          },
        ],
      },
    };
    if (req.query.sort) {
      query.body['search_after'] = JSON.parse(req.query.sort + '');
    }
    const { body } = await client.search<SearchResponse<Query>>(query);

    res.status(200).json(body.hits.hits);
  } catch (err) {
    console.error(err);
  }
};

export default posts;
