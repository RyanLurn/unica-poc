import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "staging", "production"]),
  DB_FILE_PATH: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
