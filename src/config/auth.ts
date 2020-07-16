interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '7d',
  },
} as IAuthConfig;
