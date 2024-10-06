import crypto from 'crypto';

export default async (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
};
