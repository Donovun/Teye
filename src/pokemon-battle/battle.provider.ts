import { Connection } from 'mongoose';
import { BattleSchema } from './schemas/battle.schemas';

export const battleProviders = [
  {
    provide: 'BATTLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Battle', BattleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];