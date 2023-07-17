import { PartialType } from '@nestjs/mapped-types';
import {
    IsNumber,
    IsString,
  } from 'class-validator';
import { CreateBattleDto } from './create-battle.dto';

export class UpdateBattleDto extends PartialType(CreateBattleDto) {
        @IsString()
        gen: string;
        @IsString()
        no: string;
        @IsString()
        name: string;
        type_info: Infotype;
        stats: Infostats;
        skillz: Infoskill[];
      }

      export class Infotype{
        @IsString()
        type_one: string;
        @IsString()
        type_two: string;
      }

      export class Infostats{
        @IsNumber()
        hp: number;
        @IsNumber()
        attack: number;
        @IsNumber()
        defense: number;
        @IsNumber()
        sp_atk: number;
        @IsNumber()
        sp_def: number;
        @IsNumber()
        speed: number;
        @IsNumber()
        total: number;
      }

      export class Infoskill{
        @IsString()
        skill_name: string;
        @IsString()
        skill_type: string;
        @IsNumber()
        skill_power: number;
      }

