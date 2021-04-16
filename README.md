<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description | 데스크립쑌

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository complete with tests.

## Installation | 설치

```bash
$ yarn install
```

## Running the database
```bash
$ docker-compose up -d
```

## Running the app | App 실행

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations

### Generate a migration | Migration 자동생성
```bash
$ yarn typeorm migration:generate -m "My Migration"
```

### Run the migrations | Migration 실행
```bash
$ yarn typeorm migration:run
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

For more information, please visit the NestJS web site.

## License

Nest is [MIT licensed](LICENSE).
