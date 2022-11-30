module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: '<<DBUser>>',
      password: '<<DBPassword>>',
      database: '<<DBName>>',
    },
    migrations: {
      directory: '../database/migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
};
