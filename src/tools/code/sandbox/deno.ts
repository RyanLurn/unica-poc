import { join } from "node:path";
import { $ } from "zx";

import type { SandboxRunOutput } from "@/tools/code/types";
import type { Result } from "@/types/result";
import type { UnexpectedError } from "@/utils/error/classes";

import { writeTextFile } from "@/lib/node/fs";
import { getSafeDateTimeFilename } from "@/utils/get-filename";

export async function runDeno({
  script,
  cwd,
}: {
  script: string;
  cwd: string;
}): Promise<Result<SandboxRunOutput, UnexpectedError>> {
  const path = join(cwd, ".unica", "runs", `${getSafeDateTimeFilename({ extension: "ts" })}`);

  const writeScriptFileResult = await writeTextFile({ path, text: script });
  if (!writeScriptFileResult.ok) {
    return writeScriptFileResult;
  }

  const { exitCode, stdout, stderr } = await $({
    nothrow: true,
    quiet: true,
  })`deno run --no-prompt ${path}`;
  return {
    ok: true,
    data: {
      exitCode: exitCode ?? (stderr.trim().length === 0 ? 0 : 1),
      stdout,
      stderr,
    },
  };
}
