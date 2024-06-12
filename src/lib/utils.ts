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

export function caesarCipher(str: string, key: number): string {
  return str.replace(/[a-z]/gi, function (char) {
    var offset = /[a-z]/.test(char) ? "a".charCodeAt(0) : "A".charCodeAt(0);
    return String.fromCharCode(((char.charCodeAt(0) + key - offset) % 26) + offset);
  });
}

export function decryptCaesarCipher(str: string, key: number): string {
  return caesarCipher(str, 26 - key);
}

export function getRandomNumber(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
