// remove HTML-tag-like content to prevent XSS attack
export function removeHtmlTags(str: string): string {
  return str.replace('<br>', '\n').replace(/<.*?>/g, '');
}
