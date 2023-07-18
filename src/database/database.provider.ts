import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://admin:admin123@61.7.237.18:5757/?authSource=admin&readPreference=primary&ssl=false',
      ),
  },
];
