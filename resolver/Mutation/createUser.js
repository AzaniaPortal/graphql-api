const uuidv4 = require('uuid/v4')
var common = require('../Common/mysql')
const Client = require('serverless-mysql')

exports.func = async (_, obj) => {

  //connect to the database
  var client = new Client ({
    config: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  })

  await common.init(client)

  //create the user
  var userUUID = uuidv4()

  let user = await client.query('INSERT INTO users (id, name) VALUES (?,?)', [userUUID, obj.input.Name])

  //create the users posts

  var resp = await common.getUser(client, userUUID)

  client.quit()

  return resp

}