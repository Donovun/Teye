import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Table } from './schemas/table.schemas';
import { Query } from 'express-serve-static-core';
import { table } from 'console';
import { User } from 'src/auths/schemas/user.schema';

@Injectable()
export class TableService {
    constructor(
        @InjectModel(Table.name)
        private tableModel: mongoose.Model<Table>,
    ) {}

    async findByFilter(query: Query): Promise<Table[]> { 
        const resPerPage = 8
        const cerruentPage = Number(query.page) 
        const skip = resPerPage * (cerruentPage  -1)
        const keyword = query.keyword 
        ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } 
    : {};

        const tables = await this.tableModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return tables;
    }

    async create(table: Table): Promise<Table> {
        user: User
        const data = Object.assign(table)
        const res = await this.tableModel.create(table);
        return res;
    }

    async findById(id: string): Promise<Table> {

        const isValidId = mongoose.isValidObjectId(id);

        if(!isValidId) {
            throw new BadRequestException('Please enter correct id.')
        }

        const table = await this.tableModel.findById(id);

        if(!table) {
            throw new NotFoundException('Table not found')
        }
        return table;
    
    }

    async updateById(id: string, table: Table): Promise<Table> {
        return await this.tableModel.findByIdAndUpdate(id, table, {
         new: true,
         runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Table> {
        return await this.tableModel.findByIdAndDelete(id);
    }

    async findAll(): Promise<Table[]> {
        const aggregation = [
            {
              $project: {
                _id: 0, 
                Version: 1, 
                Wide: 1, 
              }
            }
          ]
        const table = await this.tableModel.aggregate(aggregation);
        if (table && !table.length) {
          throw new NotFoundException('ยังไม่มีข้อมูลโต๊ะตัวนี้อยู่เลย');
        }
        return table;
      }
}