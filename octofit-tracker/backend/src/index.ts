import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URI = 'mongodb://localhost:27017/octofit';

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ name: 'OctoFit Tracker API', version: '1.0.0' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB on port 27017');
    app.listen(PORT, () => {
      console.log(`OctoFit backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
