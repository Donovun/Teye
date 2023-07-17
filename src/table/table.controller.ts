import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './schemas/table.schemas';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
// import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('tables')
export class TableController {
    constructor(private tableService: TableService) {}

    @Get(':id')
    async getTable(
        @Param('id')
        id: string,
    ): Promise<Table> {
        return this.tableService.findById(id);
    }

    @Get('/getall')
    async getAll():
     Promise<Table[]> {
        return this.tableService.findAll();
    }

    @Get()
    async getAllTables(@Query() query: ExpressQuery): Promise<Table[]> {
        return this.tableService.findByFilter(query);
    }

    @Post()
    // @UseGuards(AuthGuard())
    async createTable(
        @Body()
        table: CreateTableDto,
        @Req() req
    ): Promise<Table> {
        console.log(req.user);
        return this.tableService.create(table);
    }


    @Put(':id')
    async updateTable(
        @Param('id')
        id: string,
        @Body()
        table: UpdateTableDto, 
    ): Promise<Table> {
        return this.tableService.updateById(id, table);
    }

    @Delete(':id')
    async deleteTable(
        @Param('id')
        id: string,
    ): Promise<Table> {
        return this.tableService.deleteById(id);
    }

    
}
