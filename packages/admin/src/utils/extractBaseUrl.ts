/**
 * Extracts the base part of the URL.
 * @param url The full URL.
 * @returns The base part of the URL.
 */
export default function extractBaseUrl(url: string): string {
  const parsedUrl = new URL(url)
  return `${parsedUrl.protocol}//${parsedUrl.host}`
}
