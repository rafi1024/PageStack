const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { sequelize } = require('./models');

sequelize.sync().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}); 