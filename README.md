# CMS with Express and Sequelize

Full-stack REST API-driven content management system including:

- [x] SQLite database built with Sequelize migrations and seeders
- [ ] Backend REST API running on Express
- [ ] Frontend React app

## Development

### Build and seed the sample database

Sequelize configuration (models, migrations, seeders) is at `.sequelizerc`. The SQLite database is located at `.db/db.sqlite3`.

The provided migration generates `Posts` and `Keywords` tables from the defined models. Run migrations with Sequelize CLI.

```console
npx sequelize db:migrate:all
```

The provided seeders generate sample posts with linked keywords. Run seeders with Sequelize CLI.

```console
npx sequelize db:seed
```

TODO

### Run the REST API development server

TODO

### Run the front end development server (Vite)

TODO

API endpoints are proxied

## Build

### Front end

TODO

Static export of React app, to be served behind back end server
