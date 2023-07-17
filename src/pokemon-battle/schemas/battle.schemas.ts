import mongoose, { Schema } from 'mongoose';
import { Infostats, Infotype, Infoskill } from '../dto/update-battle.dto';

const InfotypeSchema = new Schema<Infotype>({
  type_one: { type: String, required: true },
  type_two: { type: String, required: true },
});

const InfostatsSchema = new Schema<Infostats>({
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  sp_atk: { type: Number, required: true },
  sp_def: { type: Number, required: true },
  speed: { type: Number, required: true },
  total: { type: Number, required: true },
});

const InfoskillSchema = new Schema<Infoskill>({
    skill_name: { type: String, required: true },
    skill_type: { type: String, required: true },
    skill_power: { type: Number, required: true },
})

export const BattleSchema = new mongoose.Schema(
  {
    gen: { type: String, required: true },
    no: { type: String, required: true },
    name: { type: String, required: true },
    type_info: { type: InfotypeSchema, required: true, id: false },
    stats: { type: InfostatsSchema, required: true, id: false },
    skillz: { type: InfoskillSchema, required: true, id: false },
    createdAt: { type: Date },
  },
  { timestamps: true, versionKey: false },
);
