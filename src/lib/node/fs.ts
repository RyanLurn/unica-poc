import { writeFile } from "node:fs/promises";

import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/error/classes";

export async function writeTextFile({
  path,
  text,
}: {
  path: string;
  text: string;
}): Promise<Result<undefined, UnexpectedError>> {
  try {
    await writeFile(path, text);
    return {
      ok: true,
      data: undefined,
    };
  } catch (error) {
    return {
      ok: false,
      error: new UnexpectedError({
        action: `write a text file to ${path}`,
        cause: error,
      }),
    };
  }
}
