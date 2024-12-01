export const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env';
    case 'staging':
      return '.env.staging';
    default:
      return '.env.development';
  }
};

export type AppConfigsEnv = {
  PORT: string;

  DATABASE_BASE_URL: string;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;

  JWT_SECRET: string;
  JWT_EXPIRATION: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  CLOUDINARY_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_URL: string;
  CLOUDINARY_PATH_IMAGE_UPLOAD: string;
  CLOUDINARY_FOLDER_AVATAR: string;
  CLOUDINARY_FOLDER_DESIGN: string;
  CLOUDINARY_FOLDER_COMMON: string;
};
