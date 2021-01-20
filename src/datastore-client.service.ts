import { Injectable } from '@nestjs/common';
import { Datastore, Transaction } from '@google-cloud/datastore';

@Injectable()
export class DatastoreClient {
  constructor(public readonly datastore: Datastore) {}

  async runInTransaction<T>(
    asyncCallback: (transaction: Transaction) => Promise<T>,
  ): Promise<T> {
    const transaction = this.datastore.transaction();
    try {
      await transaction.run();
      const result = await asyncCallback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
