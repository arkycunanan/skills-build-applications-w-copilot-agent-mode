import mongoose, { Schema } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  coach: string;
  memberCount: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    coach: { type: String, required: true },
    memberCount: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model<Team>('Team', teamSchema);

export default TeamModel;
