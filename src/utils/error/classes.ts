import type { ErrorObject } from "serialize-error";

import { serializeError } from "serialize-error";

import type { AppError, FlatError } from "@/utils/error/types";

export abstract class BaseError<Code extends string, Cause = unknown>
  extends Error
  implements AppError<Code>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract readonly code: Code;
  declare cause: Cause;

  constructor({ message, cause }: { message: string; cause: Cause }) {
    super(message, { cause });
  }

  serialize(mode?: "shallow"): FlatError<Code>;
  serialize(mode: "deep"): ErrorObject;
  serialize(mode: "shallow" | "deep" = "shallow"): FlatError<Code> | ErrorObject {
    if (mode === "shallow") {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
      };
    }
    return serializeError(this, { maxDepth: 10 });
  }
}

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  readonly name = "UnexpectedError";
  readonly code = "UNEXPECTED_ERROR";

  constructor({ action, cause }: { action: string; cause: unknown }) {
    super({
      message: `Failed to ${action} because of an unexpected error.`,
      cause,
    });
  }
}
