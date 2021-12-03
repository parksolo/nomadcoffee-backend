import { getUser } from './users/users.utils';

require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './schema';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers?.authorization;
    if (token) {
      return {
        loggedInUser: await getUser(token),
      };
    }
  },
});
const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });
app.use('/static', express.static('uploads'));
const PORT = process.env.PORT;
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);
});
