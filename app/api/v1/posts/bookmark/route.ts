import { client } from '@/libs/dynamoDb/dynamoDb'
import {
  DeleteItemCommand,
  DeleteItemInput,
  PutItemCommand,
  PutItemInput,
} from '@aws-sdk/client-dynamodb'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request) {
  const { uid, parent } = await request.json()
  const id = `${uid}-${parent}`

  const params: PutItemInput = {
    TableName: process.env.DB_TABLE_NAME,
    Item: {
      id: {
        S: id,
      },
      dataType: {
        S: 'bookmark',
      },
      uid: {
        S: uid,
      },
      parent: {
        S: parent,
      },
      publishDate: {
        N: new Date().getTime().toString(),
      },
    },
  }

  await client.send(new PutItemCommand(params))

  return new Response(null, { status: 204 })
}

export async function DELETE(request: Request) {
  const { uid, parent } = await request.json()
  const id = `${uid}-${parent}`

  const params: DeleteItemInput = {
    TableName: process.env.DB_TABLE_NAME,
    Key: {
      id: {
        S: id + '',
      },
    },
  }

  await client.send(new DeleteItemCommand(params))

  return new Response(null, { status: 204 })
}
