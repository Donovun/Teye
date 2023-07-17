import { Connection } from 'mongoose';
import { SkillSchema } from './schemas/skill.schemas';


export const skillProviders = [
  {
    provide: 'SKILL_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Skill', SkillSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];