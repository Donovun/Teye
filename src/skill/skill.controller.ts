import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill } from './interface/skill.interface';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  createSkill(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.createSkill(createSkillDto);
  }

  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @Delete(':id')
    async deleteSkill(
        @Param('id')
        id: string,
    ): Promise<Skill | null> {
        return this.skillService.deleteById(id);
    }
}
