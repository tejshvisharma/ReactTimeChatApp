import { env } from "./env";

export const socketConfig = {
  corsOrigin: env.CLIENT_URL ? [env.CLIENT_URL] : ["*"],
};