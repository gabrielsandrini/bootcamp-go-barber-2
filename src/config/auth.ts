interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '7d',
  },
} as IAuthConfig;
