export async function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const np: number = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, np)).toFixed(1))} ${sizes[np]}`;
}
