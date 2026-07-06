import { runAgentTUI } from "@ai-sdk/tui";
import { ToolLoopAgent } from "ai";

import { groq } from "@/config/groq";

const agent = new ToolLoopAgent({
  model: groq("openai/gpt-oss-120b"),
  instructions: "You are a helpful AI assistant who lives inside a terminal.",
});

await runAgentTUI({
  title: "Unica PoC",
  agent,
});
