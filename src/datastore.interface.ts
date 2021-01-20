import {DatastoreClient} from "./datastore-client.service";
import {DynamicModule, ForwardReference, Type} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {DatastoreOptions} from "@google-cloud/datastore";

export declare class DatastoreInitializeError extends Error {
}

export interface DatastoreOptionsProviderFactoryType {
    provide: string;
    useFactory: (
        config: ConfigService,
    ) => Promise<DatastoreOptions> | DatastoreOptions | undefined;
    inject: any[];
}

export interface DatastoreProviderFactoryType {
    provide: any;
    useFactory: (options: DatastoreOptions) => DatastoreClient;
    inject: string[];
}

export interface DatastoreModuleType extends DynamicModule {
    imports: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    exports: (
        | DatastoreOptionsProviderFactoryType
        | DatastoreProviderFactoryType
        )[];
    module: Type<any>;
    global: boolean;
    providers: (
        | DatastoreOptionsProviderFactoryType
        | DatastoreProviderFactoryType
        )[];
}