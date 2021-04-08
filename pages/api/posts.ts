import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';
import { NowRequest, NowResponse } from '@vercel/node';
import { API } from '../../lib/utils/api';

interface Query {
  dataType: string;
  isShow: boolean;
  publishDate: {
    order: string;
  };
}

const checkId = (id: string) => {
  return id ? id.replace(/\s/g, '%20') : null;
};

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
            should: [
              {
                has_child: {
                  type: 'bookmark',
                  inner_hits: {
                    _source: false,
                    size: 0
                  },
                  query: {
                    match_all: {}
                  }
                }
              }
            ]
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
      const sort = JSON.parse(req.query.sort+ '');
      const [publishDate, id] = sort;
      query.body['search_after'] = [
        publishDate, checkId(id)
      ];
    }
    const { body } = await client.search<SearchResponse<Query>>(query);
    const result: API = {
      statusCode: 200,
      isError: false,
      message: null,
      data: body.hits.hits,
    };

    res.status(result.statusCode).json(result);
  } catch (err) {
    console.error(err);
    const result = {
      isError: true,
      statusCode: 500,
      message: 'DB로 부터 데이터를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
      data: null,
    };

    res.status(result.statusCode).json(result);
  }
};

export default posts;
