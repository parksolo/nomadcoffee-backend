import bcrypt from 'bcrypt';
import client from '../../client';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          ok: false,
          error: 'This username or password is invalid.',
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
