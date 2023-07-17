import { PartialType } from '@nestjs/mapped-types';
import {
    IsNumber,
    IsString,
  } from 'class-validator';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
    @IsString()
    skill_name: string;
    @IsNumber()
    skill_power: number;
    @IsString()
    skill_type: string;
  }