import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { BattleSchema } from './schemas/battle.schemas';
import { AuthsModule } from 'src/auths/auths.module';
import { DatabaseModule } from 'src/database/database.module';
import { SkillService } from 'src/skill/skill.service';
import { SkillModule } from 'src/skill/skill.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Module({
  imports: [
    AuthsModule,
    DatabaseModule,
    SkillModule,
    PokemonModule
  ],
  controllers: [BattleController],
  providers: [BattleService, SkillService, PokemonService, ],
  exports: [BattleService, SkillService, PokemonService],
})
export class BattleModule {}

