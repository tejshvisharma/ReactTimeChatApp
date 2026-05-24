import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      const serverUrl = (() => {
        if (!env.SERVER_URL) {
          return `http://localhost:${env.PORT}`;
        }

        try {
          const url = new URL(env.SERVER_URL);

          if (url.port) {
            return url.toString();
          }

          url.port = String(env.PORT);
          return url.toString();
        } catch {
          return env.SERVER_URL;
        }
      })();

      console.log(`🚀 Server running on ${serverUrl}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

void bootstrap();