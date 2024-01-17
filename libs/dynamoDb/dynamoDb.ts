import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

export const client = new DynamoDBClient({
  region: process.env.DB_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESSKEY_ID!,
    secretAccessKey: process.env.DB_SECRETACCESS_KEY!,
  },
})
