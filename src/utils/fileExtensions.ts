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
