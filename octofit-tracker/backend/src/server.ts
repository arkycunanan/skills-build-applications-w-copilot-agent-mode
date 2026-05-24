import express from 'express';
import ActivityModel from './models/Activity';
import LeaderboardModel from './models/Leaderboard';
import TeamModel from './models/Team';
import UserModel from './models/User';
import WorkoutModel from './models/Workout';

const app = express();

export const PORT = 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;

export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'OctoFit Tracker API',
    version: '1.0.0',
    baseUrl: API_BASE_URL,
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await TeamModel.find().lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find().sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default app;
