# Manaos Odyssey API

REST API for Manaos Odyssey developed in TypeScript and NestJS. For the database, PostgreSQL was used in conjunction with TypeORM for data management.

**Note:** This API was documented and tested using <a href="https://swagger.io/tools/swagger-ui/" target="_blank">Swagger UI</a>. However, alternatives like Postman or Insomnia can also be used to test the endpoints.

## Architecture and Features
* <a href="https://www.macoratti.net/21/05/net_onion1.htm" target="_blank">Onion Architecture</a> and dependency injection, ensuring modularity, testability, and decoupling;
* Docker for database containerization;
* class-validator for DTO validations;
* Helpers to standardize HTTP request statuses.

## Installation

* Open the <code>.env-example</code> file. It should look like this:
  ```bash
  DB_HOST=localhost
  DB_PORT=5435
  DB_USERNAME=CHANGE-ME
  DB_PASSWORD=CHANGE-ME
  DB_DATABASE=CHANGE-ME
  ```
* Rename the file to <code>.env</code> and change all <code>CHANGE-ME</code> values of the variables according to your preference.

* Run the following command:
  ```bash
  npm install
  ```

* Download and install <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a> if you don't have it on your machine.

* Keep Docker Desktop active and running in the background, ensuring that there are no containers or images running.

* Run the following command:
  ```
  docker compose up --build
  ```

## Running the API
```bash
# development
$ npm run start

# watch mode
$ npm run start:debug
```

## Unit Tests
Manaos Odyssey API has unit tests. To run them, use the following command:
```bash
$ npm run test
```
You can see a CLI coverage of these tests running the following command:
```bash
$ npm test -- --coverage
```
> After running the command above, you can also see a generated HTML file containing the coverage in a more readable way. It is located on the following path: `backend\coverage\lcov-report\index.html`

