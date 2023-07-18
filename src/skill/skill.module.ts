import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}

