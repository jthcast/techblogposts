import { NowRequest, NowResponse } from '@vercel/node';
import { API } from '../../lib/utils/api';
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
      size: 100,
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
                multi_match: {
                  query,
                  fields: ['title', 'company'],
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

export default search;
