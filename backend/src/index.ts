import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on ${env.SERVER_URL}:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void bootstrap();