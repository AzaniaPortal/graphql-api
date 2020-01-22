const { GraphQLServerLambda } = require('graphql-yoga')
let fs = require('fs')

const typeDefs = fs.readFileSync('./schema.gql').toString('utf-8');

const resolvers = {
  Query: {
    User: require ('./resolver/Query/getUser').func,
    MissingPerson: require('./resolver/Query/getMissingPerson').func
  },
  Mutation: {
    createUser: require('./resolver/Mutation/createUser').func,
    createMissingPerson: require('./resolver/Mutation/createUser').func,
    updateMissingPerson: require('./resolver/Mutation/updateMissingPerson').func
  }
}

const lambda = new GraphQLServerLambda ({
  typeDefs,
  resolvers
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler