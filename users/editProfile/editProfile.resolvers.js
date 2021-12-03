import { hashPassword, protectedResolver } from '../users.utils';
import client from '../../client';
import fs from 'fs';

const upload = async (avatar, username) => {
  if (!avatar) return null;
  const { filename, createReadStream } = await avatar;
  const newFilename = `${username}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = fs.createWriteStream(`${process.cwd()}/uploads/${newFilename}`);
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
};

const editProfile =
  () =>
  async (_, { name, email, location, avatar, githubUsername, password }, { loggedInUser }) => {
    const avatarURL = await upload(avatar, loggedInUser.username);
    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        name,
        email,
        location,
        githubUsername,
        ...(password && { password: await hashPassword(password) }),
        ...(avatarURL && { avatarURL }),
      },
    });
    if (updatedUser?.id) {
      return {
        ok: true,
      };
    }
    return {
      ok: false,
      error: 'Could not update profile.',
    };
  };

export default {
  Mutation: {
    editProfile: protectedResolver(editProfile()),
  },
};
