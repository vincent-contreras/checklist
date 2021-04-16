let rootDir = __dirname

if (process.argv[0].includes('ts-node')) {
  rootDir += '/src';
} else {
  rootDir += '/dist';
}

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  logger: 'advanced-console',
  synchronize: false,
  migrations: [`${rootDir}/migrations/*{.js,.ts}`],
  entities: [`${rootDir}/**/*.entity{.js,.ts}`],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
