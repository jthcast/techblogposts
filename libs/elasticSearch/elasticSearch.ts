import { Client } from '@elastic/elasticsearch/index.js'

export const index = process.env.ES_INDEX_NAME

export const client = new Client({
  node: process.env.ES_ENDPOINT,
  auth: {
    username: process.env.ES_USER_NAME!,
    password: process.env.ES_PASSWORD!,
  },
})
