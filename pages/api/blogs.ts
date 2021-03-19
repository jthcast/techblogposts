import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';
import { NowRequest, NowResponse } from '@vercel/node';
import { API } from '../../lib/utils/api';

interface Query {
  cron: boolean;
  dataType: string;
}

const blogs = async (req: NowRequest, res: NowResponse) => {
  try {
    const { body } = await client.search<SearchResponse<Query>>({
      index,
      size: 200,
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

export default blogs;
