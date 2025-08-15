console.log('process.env.PORT in env.config.ts', process.env.PORT);

export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT as string, 10),
});
