import mongoose, { Schema } from 'mongoose';

export const SkillSchema = new mongoose.Schema(
    {
      skill_name: { type: String, required: true },
      skill_type: { type: String, required: true },
      skill_power: { type: Number, required: true },
      createdAt: { type: Date },
    },
    { timestamps: true, versionKey: false },
  );
  