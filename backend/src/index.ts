import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { createServer } from "http";
import { initializeSocketServer } from "./sockets/socket";

const httpServer = createServer(app);

initializeSocketServer(httpServer);

async function bootstrap() {
  try {
    await connectDatabase();

    httpServer.listen(env.PORT, () => {
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