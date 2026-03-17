module.exports = {
  apps: [
    {
      name: 'index',
      script: './dist/bot-server/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ALLOWED_ORIGINS: 'http://localhost:9000,https://meho-tools.tools.sbs.softgames.de',
      },
    },
  ],
};
