import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import ActivityModel from '../models/Activity';
import LeaderboardModel from '../models/Leaderboard';
import TeamModel from '../models/Team';
import UserModel from '../models/User';
import WorkoutModel from '../models/Workout';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await TeamModel.insertMany([
    {
      name: 'Cardio Crushers',
      mascot: 'Falcon',
      coach: 'Paul Octo',
      memberCount: 14,
    },
    {
      name: 'Strength Sharks',
      mascot: 'Shark',
      coach: 'Avery Morgan',
      memberCount: 11,
    },
  ]);

  await UserModel.insertMany([
    {
      fullName: 'Alex Rivera',
      email: 'alex.rivera@mergington.edu',
      gradeLevel: 10,
      teamName: 'Cardio Crushers',
      weeklyGoalMinutes: 180,
    },
    {
      fullName: 'Jordan Lee',
      email: 'jordan.lee@mergington.edu',
      gradeLevel: 11,
      teamName: 'Strength Sharks',
      weeklyGoalMinutes: 200,
    },
    {
      fullName: 'Sam Patel',
      email: 'sam.patel@mergington.edu',
      gradeLevel: 9,
      teamName: 'Cardio Crushers',
      weeklyGoalMinutes: 150,
    },
  ]);

  await ActivityModel.insertMany([
    {
      userEmail: 'alex.rivera@mergington.edu',
      activityType: 'running',
      durationMinutes: 35,
      caloriesBurned: 280,
      date: new Date('2026-05-20T16:00:00Z'),
    },
    {
      userEmail: 'jordan.lee@mergington.edu',
      activityType: 'strength',
      durationMinutes: 45,
      caloriesBurned: 320,
      date: new Date('2026-05-21T16:30:00Z'),
    },
    {
      userEmail: 'sam.patel@mergington.edu',
      activityType: 'walking',
      durationMinutes: 28,
      caloriesBurned: 140,
      date: new Date('2026-05-22T16:15:00Z'),
    },
  ]);

  await LeaderboardModel.insertMany([
    {
      userEmail: 'jordan.lee@mergington.edu',
      points: 430,
      rank: 1,
      streakDays: 8,
    },
    {
      userEmail: 'alex.rivera@mergington.edu',
      points: 395,
      rank: 2,
      streakDays: 6,
    },
    {
      userEmail: 'sam.patel@mergington.edu',
      points: 310,
      rank: 3,
      streakDays: 4,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Starter Cardio Blast',
      category: 'cardio',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      equipment: ['jump rope'],
    },
    {
      title: 'After-School Strength Circuit',
      category: 'strength',
      difficulty: 'intermediate',
      estimatedMinutes: 35,
      equipment: ['dumbbells', 'resistance bands'],
    },
    {
      title: 'Mobility Reset',
      category: 'mobility',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      equipment: ['yoga mat'],
    },
  ]);

  console.log('Seed completed successfully.');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
