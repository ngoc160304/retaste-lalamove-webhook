require('dotenv').config()

const env = {
  APP_PORT: parseInt(process.env.APP_PORT || '3000', 10),
  APP_HOST: process.env.APP_HOST || 'localhost',
  MONGO_URI: process.env.MONGO_URI || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  BUILD_MODE: process.env.BUILD_MODE || '',
  BREVO_API_KEY: process.env.BREVO_API_KEY || '',
  EMAIL_NAME: process.env.EMAIL_NAME || '',
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || '',
  REDIS_URL: process.env.REDIS_URL || '',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || ''),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_NAME: process.env.REDIS_NAME || '',
  AWS_S3_BUCKET_PUBLIC_ACCESS_KEY: process.env.AWS_S3_BUCKET_PUBLIC_ACCESS_KEY || '',
  AWS_S3_BUSKET_SECRET_ACCESS_KEY: process.env.AWS_S3_BUSKET_SECRET_ACCESS_KEY || '',
  AWS_REGION: process.env.AWS_REGION || '',
  AWS_S3_BUKET: process.env.AWS_S3_BUKET || '',
  AWS_KEY_PAIR_ID: process.env.AWS_KEY_PAIR_ID || '',
  AWS_CLOUDFRONT_URL: process.env.AWS_CLOUDFRONT_URL || '',
  AWS_CLOUDFRONT_PRIVATE_KEY: process.env.AWS_CLOUDFRONT_PRIVATE_KEY || '',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || '',
  SEPAY_SECRET_KEY: process.env.SEPAY_SECRET_KEY || '',
  SEPAY_MERCHANT_ID: process.env.SEPAY_MERCHANT_ID || '',
  LALAMOVE_API_KEY: process.env.LALAMOVE_API_KEY || '',
  LALAMOVE_BASE_URL: process.env.LALAMOVE_BASE_URL || '',
  LALAMOVE_API_SECRET: process.env.LALAMOVE_API_SECRET || ''
};

module.exports = env;