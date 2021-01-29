import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';
import { NowRequest, NowResponse } from '@vercel/node';

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY,
  },
});

const blogs = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.method === 'GET') {
      const params: QueryCommandInput = {
        TableName: process.env.DB_TABLE_NAME,
        KeyConditionExpression: 'dataType = :blog',
        ExpressionAttributeValues: {
          ':blog': { S: 'blog' },
        },
        ProjectionExpression: 'company, blogURL',
        ScanIndexForward: false,
      };
      const results = await dbclient.send(new QueryCommand(params));
      res.status(200).json(results);
    } else {
      res.status(200).json('"Unauthorized"');
    }
  } catch (err) {
    console.error(err);
  }
};

export default blogs;
