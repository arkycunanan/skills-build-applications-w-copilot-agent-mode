import { connectDatabase } from './config/database';
import app, { API_BASE_URL, PORT } from './server';

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`OctoFit backend running on ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit backend:', error);
    process.exit(1);
  }
}

void startServer();
