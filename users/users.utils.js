import jwt from 'jsonwebtoken';
import client from '../client';
import bcrypt from 'bcrypt';

export const getUser = async (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    return null;
  }
  return client.user.findUnique({ where: { id: payload.id } });
};

export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action.',
    };
  }
  return resolver(root, args, context, info);
};

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
