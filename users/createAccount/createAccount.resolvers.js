import client from '../../client';

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
        return { ok: false, error: 'This username or email is already taken.' };
      }
      const hashedPassword = await hashedPassword(password);
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
