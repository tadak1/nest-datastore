import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatastoreClient } from './datastore-client.service';
import { DatastoreModule } from './datastore.module';

describe('DatastoreClientService', () => {
  let client: DatastoreClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [],
        }),
        DatastoreModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => config.get('datastore'),
        }),
      ],
      providers: [],
    }).compile();

    client = module.get<DatastoreClient>(DatastoreClient);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });
});
