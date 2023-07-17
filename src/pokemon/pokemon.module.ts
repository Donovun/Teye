import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonSchema } from './schemas/pokemon.schemas';
import { AuthsModule } from 'src/auths/auths.module';
import { DatabaseModule } from 'src/database/database.module';
import { SkillService } from 'src/skill/skill.service';
import { SkillModule } from 'src/skill/skill.module';

@Module({
  imports: [
    AuthsModule,
    DatabaseModule,
    SkillModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, SkillService],
  exports: [PokemonService],
})
export class PokemonModule {}

