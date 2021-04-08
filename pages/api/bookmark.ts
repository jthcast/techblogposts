import { DeleteItemCommand, DeleteItemInput, DynamoDBClient, PutItemCommand, PutItemInput } from '@aws-sdk/client-dynamodb';
import { NowRequest, NowResponse } from '@vercel/node';
import { API } from '../../lib/utils/api';
import { client, index, SearchResponse } from '../../lib/utils/elasticSearch';

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY,
  },
});

export interface GetBookmarks {
  _source: {
    parent: string;
  }
}

const bookmark = async (req: NowRequest, res: NowResponse) => {
  try {
    const method = req.method;
    if (method === 'POST') {
      const { uid, parent } = JSON.parse(req.body);
      const id = `${uid}-${parent}`;
      const params: PutItemInput = {
        TableName: process.env.DB_TABLE_NAME,
        Item: {
          'id': {
            S: id
          },
          'dataType': {
            S: 'bookmark'
          },
          'uid': {
            S: uid
          },
          'parent': {
            S: parent
          },
          'publishDate': {
            N: new Date().getTime().toString()
          }
        }
      };
      const results = await dbclient.send(new PutItemCommand(params));
      const result: API = {
        statusCode: 200,
        isError: false,
        message: null,
        data: null,
      };
      res.status(200).json(result);
    }else if(method === 'DELETE'){
      const { id } = req.query;
      const params: DeleteItemInput = {
        TableName: process.env.DB_TABLE_NAME,
        Key: {
          'id': {
            S: id+''
          }
        }
      };
      const results = await dbclient.send(new DeleteItemCommand(params));
      const result: API = {
        statusCode: 200,
        isError: false,
        message: null,
        data: null,
      };
      res.status(200).json(result);
    }else if(method === 'GET'){
      const { uid, getType } = req.query;
      let query = undefined;
      if(getType === 'children'){
        query = {
          index,
          size: 100,
          _source_includes: 'parent',
          body: {
            query: {
              bool: {
                filter: [
                  {
                    term: {
                      dataType: 'bookmark',
                    },
                  },
                  {
                    term: {
                      'uid.keyword': uid,
                    },
                  },
                ],
              },
            },
          },
        };
      }else if(getType === 'parent'){
        query = {
          index,
          size: 100,
          body: {
            query: {
              has_child: {
                type: 'bookmark',
                query: {
                  term: {
                    'uid.keyword': uid
                  }
                }
              }
            }
          }
        }
      }
      const { body } = await client.search<SearchResponse<GetBookmarks>>(query);
      const result: API = {
        statusCode: 200,
        isError: false,
        message: null,
        data: body.hits.hits,
      };
  
      res.status(result.statusCode).json(result);
    }
  } catch (err) {
    console.error(err);
    const result: API = {
      statusCode: 500,
      isError: true,
      message: 'DB 오류',
      data: null,
    };
    res.status(result.statusCode).json(result);
  }
};

export default bookmark;
