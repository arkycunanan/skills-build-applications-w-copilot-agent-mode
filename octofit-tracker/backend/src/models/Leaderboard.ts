import mongoose, { Schema } from 'mongoose';

export interface Leaderboard {
  userEmail: string;
  points: number;
  rank: number;
  streakDays: number;
}

const leaderboardSchema = new Schema<Leaderboard>(
  {
    userEmail: { type: String, required: true, lowercase: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const LeaderboardModel = mongoose.model<Leaderboard>(
  'Leaderboard',
  leaderboardSchema
);

export default LeaderboardModel;
