import type { SandboxRunOutput } from "@/tools/code/types";
import type { Result } from "@/types/result";
import type { UnexpectedError } from "@/utils/error/classes";

export abstract class Sandbox<T extends string> {
  abstract readonly type: T;
  cwd: string;
  env: Record<string, string>;
  timeoutMs?: number;

  constructor({
    cwd,
    env,
    timeoutMs,
  }: {
    cwd: string;
    env: Record<string, string>;
    timeoutMs?: number;
  }) {
    this.cwd = cwd;
    this.env = env;
    this.timeoutMs = timeoutMs;
  }

  abstract runScript(params: {
    script: string;
    cwd?: string;
    env?: Record<string, string>;
    timeoutMs?: number;
  }): Promise<Result<SandboxRunOutput, UnexpectedError>>;
}
