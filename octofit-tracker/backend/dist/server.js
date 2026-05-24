"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Team_1 = __importDefault(require("./models/Team"));
const User_1 = __importDefault(require("./models/User"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
exports.PORT = 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.API_BASE_URL = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${exports.PORT}`;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        name: 'OctoFit Tracker API',
        version: '1.0.0',
        baseUrl: exports.API_BASE_URL,
    });
});
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User_1.default.find().lean();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.default.find().lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.default.find().sort({ date: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().sort({ rank: 1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.default.find().lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
exports.default = app;
