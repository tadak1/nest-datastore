<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nest.js Google Cloud Datastore

## Installation

```bash
$ npm install
```

## Usage

### Connect to Datastore Emulator

.env

```bash
datastore_project_id=PROJECT_ID
datastore_emulator_endpoint=0.0.0.0:8080
```

config/configuration.ts

```typescript
export default () => ({
  datastore: {
    projectId: process.env.datastore_project_id,
    apiEndpoint: process.env.datastore_emulator_endpoint,
  },
});
```

app.module.ts

```typescript
DatastoreModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => config.get('datastore'),
})
```

### Connect to Datastore

.env

```bash
node_env = production
```

config/configuration.ts

```typescript
export default () => ({
  datastore: {
    projectId: process.env.datastore_project_id,
    apiEndpoint: process.env.datastore_emulator_endpoint,
  },
});
```

app.module.ts

```typescript
DatastoreModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => config.get('datastore'),
})
```

```typescript
    const datastoreClient = module.get<DatastoreClient>(DatastoreClient);
    const datastore = datastoreClient.datastore;
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

