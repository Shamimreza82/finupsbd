import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export const ConfigFile = {
  NODE_ENV: process.env.NODE_ENV,
  npm_package_version: process.env.npm_package_version,
  node_version: process.env.node_version,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,

  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,

  DEMO_USER_EMAIL: process.env.DEMO_USER_EMAIL,
  DEMO_USER_PASSWORD: process.env.DEMO_USER_PASSWORD,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,

  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  MAILJET_API_KEY: process.env.MAILJET_API_KEY,
  MAILJET_SECRET_KEY: process.env.MAILJET_SECRET_KEY,
  SENDER_EMAIL: process.env.SENDER_EMAIL,

  SECRET_KEY: process.env.SECRET_KEY,
  HMAC_KEY: process.env.HMAC_KEY,

  API_DOC_SECRET: process.env.API_DOC_SECRET,

  SSL_SMS_API_TOKEN: process.env.SSL_SMS_API_TOKEN,
  SSL_SMS_SID: process.env.SSL_SMS_SID,
};
