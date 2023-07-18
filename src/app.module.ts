import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
import { SkillModule } from './skill/skill.module';
import { BattleModule } from './pokemon-battle/battle.module';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    //   isGlobal: true,
    // }),
    // TypeOrmModule.forFeature([Pokemon, Skill]),
    MongooseModule.forRoot('mongodb://admin:admin123@61.7.237.18:5757/?authSource=admin&readPreference=primary&ssl=false'),
    SkillModule,
    PokemonModule,
    BattleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}