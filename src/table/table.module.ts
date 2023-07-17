import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TableSchema } from './schemas/table.schemas'
import { AuthsModule } from 'src/auths/auths.module';

@Module({
  imports: [
    AuthsModule,
    MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
