// exports.init = async (client) => {

//   await client.query (`
//     CREATE TABLE IF NOT EXISTS user_types (
      
//     );
//   `)
//   await client.query(`
//     CREATE TABLE IF NOT EXISTS User (
      
//     );
//   `)

//   await client.query (`
//     CREATE TABLE IF NOT EXISTS MissingPerson (
      
//     )
//   `)
// }

exports.getUser = async (client, id) => {
  let user = {}
  let userData = await client.query(`select name, surname, email, password, profile_photo, on_twitter, on_facebook, on_whatsapp, can_report, reg_date, mod_date, facebook_username, twitter_username, whatsapp_number, user_type from users where ID=?`, id)

  if(userData.length == 0) {
    return null
  }

  user = userData[0]
  var userType = await client.query(`SELECT ID, user_type FROM user_types WHERE ID = ?`, [user.user_type])

  user.user_type = userType.map( function (x){
    return {
      id: x.ID,
      user_type: x.user_type
    }
  })

  return user
}


exports.getMissingPerson = async (client, id) => {
  let missingPerson = {}
  let missingPersonDB = await client.query(`select full_name, went_missing_in, person_description, person_picture, reported_by, reported_on, modified_by, modified_on, approved, viewable from missing_persons where ID = ?`, 1)

  
  if(missingPersonDB.length == 0) {
    return null
  }

  missingPerson.reported_by = this.getUser(client, [missingPersonDB.reported_by]).map( function (x){
    return {
      name: x.name,
      surname: x.surname,
      email: x.email
    }
  })

  missingPerson = missingPersonDB[0]
  return missingPerson
}