/**
 * Generates a filename-safe string based on the current local date and time.
 * Format: YYYY-MM-DD_HH-mm-ss (e.g. "2026-07-06_14-32-09")
 * Safe for both Linux and Windows filesystems (avoids : / \ * ? " < > | and spaces).
 */
export function getSafeDateTimeFilename({
  prefix,
  extension,
}: {
  prefix?: string;
  extension?: string;
}): string {
  const now = new Date();

  const pad = (n: number, width = 2): string => n.toString().padStart(width, "0");

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const datePart = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

  const safePrefix = prefix ? sanitizeForFilename(prefix) + "_" : "";

  const safeExtension = extension ? "." + extension.replace(/^\.+/, "") : "";

  return `${safePrefix}${datePart}${safeExtension}`;
}

/**
 * Strips/replaces characters that are invalid or problematic in filenames
 * on Windows (: \ / * ? " < > |) and Linux (/ and null byte),
 * plus trims trailing dots/spaces (Windows disallows these at the end).
 */
function sanitizeForFilename(input: string): string {
  return (
    input
      // oxlint-disable-next-line no-control-regex
      .replace(/[:\\/*?"<>|\x00-\x1F]/g, "-") // invalid chars -> dash
      .replace(/\s+/g, "_") // spaces -> underscore
      .replace(/[.\s]+$/, "") // no trailing dots/spaces (Windows)
      .replace(/^\.+/, "")
  ); // avoid leading dot (hidden file on Linux)
}
