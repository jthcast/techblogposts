import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemInput,
} from '@aws-sdk/client-dynamodb'

const dbclient = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID!,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY!,
  },
})

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  const { id } = await request.json()

  const params: UpdateItemInput = {
    TableName: process.env.DB_TABLE_NAME,
    UpdateExpression: 'SET viewCount = if_not_exists(viewCount, :init) + :val',
    ExpressionAttributeValues: {
      ':init': { N: '0' },
      ':val': { N: '1' },
    },
    Key: {
      id: { S: id },
    },
  }

  await dbclient.send(new UpdateItemCommand(params))

  return new Response(null, { status: 204 })
}
