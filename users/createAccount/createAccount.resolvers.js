import client from '../../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, name, email, password, location, avatarURL, githubUsername }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return { ok: false, error: 'This username/email is already taken.' };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          name,
          password: hashedPassword,
          email,
          location,
          avatarURL,
          githubUsername,
        },
      });
      return { ok: true };
    },
  },
};
