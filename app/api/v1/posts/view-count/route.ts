import { client } from '@/libs/dynamoDb/dynamoDb'
import { UpdateItemCommand, UpdateItemInput } from '@aws-sdk/client-dynamodb'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
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

  await client.send(new UpdateItemCommand(params))

  return new Response(null, { status: 201 })
}
