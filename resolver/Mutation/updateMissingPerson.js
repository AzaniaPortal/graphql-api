const Client = require('serverless-mysql')
const common = require('../Common/mysql')

exports.func = async (_, { id, input }) => {
  // instantiate database connection
  const client = Client({
    config: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  })

  // formulate a query to update the missing persons database record
  const queryString = `UPDATE users SET ${Object.keys(input).toString().replace(/,/g, '=?,')}=? WHERE id=?`

  // run the formulated query
  await client.query(queryString, [...Object.values(input), id])

  // return the data we have just updated
  const resp = await common.getMissingPerson(client, id)

  // Close the connection.
  client.quit()

  return resp
}
