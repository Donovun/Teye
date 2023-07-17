import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { TableModule } from './table/table.module';
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
    MongooseModule.forRoot('mongodb://localhost:27023/test'),
    BookModule,
    SkillModule,
    AuthsModule,
    TableModule,
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