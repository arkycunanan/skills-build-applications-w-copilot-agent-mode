import mongoose, { Schema } from 'mongoose';

export interface User {
  fullName: string;
  email: string;
  gradeLevel: number;
  teamName: string;
  weeklyGoalMinutes: number;
}

const userSchema = new Schema<User>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    gradeLevel: { type: Number, required: true, min: 9, max: 12 },
    teamName: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 30 },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
