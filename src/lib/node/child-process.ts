import type { ChildProcess, StdioOptions } from "node:child_process";

import { spawn } from "node:child_process";

import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/error/classes";

export function spawnChildProcess({
  command,
  args,
  cwd,
  env,
  stdio,
  timeoutMs,
}: {
  command: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
  stdio: StdioOptions;
  timeoutMs?: number;
}): Result<ChildProcess, UnexpectedError> {
  try {
    const childProcess = spawn(command, args, { cwd, env, stdio, timeout: timeoutMs });
    return {
      ok: true,
      data: childProcess,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: `spawn a child process with "${command} ${args.join(" ")}" in "${cwd}"`,
        cause: error,
      }),
    };
  }
}
