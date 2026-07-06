import { createGroq } from "@ai-sdk/groq";

import { env } from "@/config/env";

export const groq = createGroq({
  apiKey: env.GROQ_API_KEY,
});
