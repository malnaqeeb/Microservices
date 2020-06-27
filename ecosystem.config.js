const path = require('path');

const basePath = path.join(__dirname, '/packages');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // API GATEWAY
    {
      name: 'Gateway',
      script: basePath + '/gateway/server.js',
      watch: true,
      env: {
        PORT: 3001,
        SERVICE_DB_PORT: 4001,
        Q_URI:
          'amqp://withjded:Skq4qrqx22YIWDno-dRmYNi1RIwMvzdF@eagle.rmq.cloudamqp.com/withjded'
      },
      instances: 'max',
      exec_mode: 'cluster'
    },

    // DB SERVICE
    {
      name: 'DB Service',
      script: basePath + '/database_service/server.js',
      watch: true,
      env: {
        PORT: 4001
      }
    },

    // MAILING SERVICE
    {
      name: 'Mailing Service',
      script: basePath + '/mailing_service/index.js',
      watch: true,
      env: {
        MJ_API_PUBLIC: '474a9b5bf32902428304ab32996c5a1c',
        MJ_API_SECRET: 'bb1cba7d5db840c3fd4f685d993aabd6',
        Q_URI:
          'amqp://withjded:Skq4qrqx22YIWDno-dRmYNi1RIwMvzdF@eagle.rmq.cloudamqp.com/withjded'
      }
    }
  ]
};
