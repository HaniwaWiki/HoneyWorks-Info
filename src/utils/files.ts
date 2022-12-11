const imageExtension = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
const audioExtension = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
const videoExtension = ['mp4', 'webm'];

export function getExtension(url: string): string {
  return url.split('.').pop() || '';
}

export const isImage = (url: string) =>
  imageExtension.includes(getExtension(url));
export const isAudio = (url: string) =>
  audioExtension.includes(getExtension(url));
export const isVideo = (url: string) =>
  videoExtension.includes(getExtension(url));

// format bytes (e.g. 1048576) to human-readable sizes (e.g. 1MiB)
export function formatSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let size = bytes;
  while (size >= 1000) {
    size /= 1024;
    index += 1;
  }
  return `${size.toFixed(1)} ${sizes[index]}`;
}
