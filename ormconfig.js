module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  // entities: [`${__dirname}/src/entities/*{.js,.ts}`],
  migrations: [`${__dirname}/migrations/*{.js,.ts}`],
  entities: ['dist/**/*.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

console.log('Ormconfig file read!');
console.log(module.exports);
