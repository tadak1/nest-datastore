import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { Datastore, DatastoreOptions } from '@google-cloud/datastore';
import {
  DatastoreInitializeError,
  DatastoreModuleType,
} from './datastore.interface';
import { DATASTORE_OPTIONS_KEY } from './datastore.type';
import { ConfigService } from '@nestjs/config';
import { DatastoreClient } from './datastore-client.service';

@Module({})
export class DatastoreModule {
  static forRootAsync(options: {
    imports: Array<
      Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    useFactory: (
      config: ConfigService,
    ) => Promise<DatastoreOptions> | DatastoreOptions | undefined;
    inject: any[];
  }): DatastoreModuleType {
    const datastoreOptionsProviderFactory = {
      provide: DATASTORE_OPTIONS_KEY,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const datastoreProviderFactory = {
      provide: DatastoreClient,
      useFactory: (options: DatastoreOptions) => {
        if (process.env.node_env === 'production') {
          const datastore = new Datastore();
          console.debug(`Datastore Connect to ${datastore.baseUrl_}`);
          return new DatastoreClient(datastore);
        }
        if (
          options.projectId !== undefined &&
          options.apiEndpoint !== undefined
        ) {
          const datastore = new Datastore(options);
          console.debug(`Datastore Connect to ${datastore.baseUrl_}`);
          return new DatastoreClient(datastore);
        }
        throw new DatastoreInitializeError();
      },
      inject: [DATASTORE_OPTIONS_KEY],
    };

    return {
      global: true,
      module: DatastoreModule,
      imports: options.imports,
      providers: [datastoreOptionsProviderFactory, datastoreProviderFactory],
      exports: [datastoreOptionsProviderFactory, datastoreProviderFactory],
    };
  }
}
