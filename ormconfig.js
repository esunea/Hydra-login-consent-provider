const { Config } = require('@foal/core');

module.exports = {
  type: Config.get('database.type'),
  database: Config.get('database.database'),
  // host: Config.get('database.host'),
  // port: Config.get('database.port'),
  // username: Config.get('database.username'),
  // password: Config.get('database.password'),

  migrations: ["build/migrations/*.js"],
  entities: ["build/app/**/*.entity.js"],
  cli: { migrationsDir: "src/migrations" },

  dropSchema: Config.get('database.dropSchema'),
  synchronize: Config.get('database.synchronize'),
  insecureAuth: Config.get('database.insecureAuth')
}
