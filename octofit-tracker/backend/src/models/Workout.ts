import mongoose, { Schema } from 'mongoose';

export interface Workout {
  title: string;
  category: 'cardio' | 'strength' | 'mobility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  equipment: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['cardio', 'strength', 'mobility'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    estimatedMinutes: { type: Number, required: true, min: 10 },
    equipment: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const WorkoutModel = mongoose.model<Workout>('Workout', workoutSchema);

export default WorkoutModel;
