import { Connection } from 'mongoose';
import { PokemonSchema } from './schemas/pokemon.schemas';


export const pokemonProviders = [
  {
    provide: 'POKEMON_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pokemon', PokemonSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];