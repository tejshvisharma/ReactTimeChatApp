// env.ts - Complete version
import { config } from "dotenv";
import { z } from "zod";
import path from "path";

// Specify env file path explicitly
config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(5, "MONGODB_URI must be a valid connection string"),
  CLIENT_URL: z.string().url().optional().default("http://localhost:5173"),
  SERVER_URL: z.string().url().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;

// Debug log (remove in production)
console.log("📋 Environment loaded:", {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  MONGODB_URI: env.MONGODB_URI ? "✅ Set" : "❌ Missing",
});