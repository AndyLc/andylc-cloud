const databaseName = 'passport_local_knex';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    },
    debug: false
  },
  test: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: 'postgres://fgjesboiglenwu:f300fca75d24368fdd3555c1e264983c9036324a96d43d62b3766b8b1a419df4@ec2-107-21-201-57.compute-1.amazonaws.com:5432/d7rkb9kurq4tra',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    },
    ssl: true
  }
};
