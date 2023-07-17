import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Skill } from './interface/skill.interface';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(@Inject('SKILL_MODEL') private readonly skillModel: Model<Skill>) {}

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const createdSkill = new this.skillModel(createSkillDto);
    return createdSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async deleteById(id: string): Promise<Skill> {
    return await this.skillModel.findByIdAndDelete(id);
  }

  async findSkillsByIds(skillIds: string[]): Promise<Skill[]> {
    const skills = await this.skillModel.find({
      _id: { $in: skillIds },
    });
    return skills;
  }

  async findById(id: string): Promise<Skill> {
    const skill = await this.skillModel.findById(id);
    return skill;
  }

}
