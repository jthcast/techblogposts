import { DynamoDBClient, UpdateItemCommand, UpdateItemInput } from '@aws-sdk/client-dynamodb';
import { NowRequest, NowResponse } from '@vercel/node';

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY,
  },
});

const viewCount = async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.method === 'POST') {
      const params: UpdateItemInput = {
        TableName: process.env.DB_TABLE_NAME,
        UpdateExpression: 'SET viewCount = if_not_exists(viewCount, :init) + :val',
        ExpressionAttributeValues: {
          ':init': { N: '0' },
          ':val': { N: '1' },
        },
        Key: {
          id: { S: req.body.link },
        },
      };
      const results = await dbclient.send(new UpdateItemCommand(params));
      res.status(200).json(results);
    }
  } catch (err) {
    console.error(err);
  }
};

export default viewCount;
