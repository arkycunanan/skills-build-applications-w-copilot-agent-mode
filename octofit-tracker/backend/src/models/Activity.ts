import mongoose, { Schema } from 'mongoose';

export interface Activity {
  userEmail: string;
  activityType: 'running' | 'walking' | 'strength' | 'cycling' | 'sports';
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<Activity>(
  {
    userEmail: { type: String, required: true, lowercase: true },
    activityType: {
      type: String,
      required: true,
      enum: ['running', 'walking', 'strength', 'cycling', 'sports'],
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const ActivityModel = mongoose.model<Activity>('Activity', activitySchema);

export default ActivityModel;
