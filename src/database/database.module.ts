import { Module } from '@nestjs/common';
import { pokemonProviders } from 'src/pokemon/pokemon.provider';
import { databaseProviders } from './database.provider';
import { skillProviders } from 'src/skill/skill.provider';
import { battleProviders } from 'src/pokemon-battle/battle.provider';

@Module({
  providers: [
    ...pokemonProviders,
    ...skillProviders,
    ...battleProviders,
    ...databaseProviders
  ],
  exports: [
    ...pokemonProviders,
    ...skillProviders,
    ...battleProviders,
    ...databaseProviders
  ],
})
export class DatabaseModule {}