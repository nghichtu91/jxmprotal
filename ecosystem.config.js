const path = require('path');

const path_NODEJS = process.env.Path.split(';').filter(f => f.includes('nodejs'))[0];
const path_NPM = path.join(path_NODEJS, 'node_modules', 'npm', 'bin', 'npm-cli.js');

module.exports = {
  apps: [
    {
      name: 'jxportal',
      script: path_NPM,
      automation: false,
      args: 'run serve',
      autorestart: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
