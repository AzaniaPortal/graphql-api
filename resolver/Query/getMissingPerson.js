const common = require('../Common/mysql')
const Client = require('serverless-mysql')

exports.func = async (_, { id }) => {
  let client = Client({
    config: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  })

  let response = await common.getMissingPerson(client, id)
  client.quit()

  return response
}