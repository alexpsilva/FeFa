export function urlEncodedToJson(urlEncoded: string): Record<string, string> {
    return Object.fromEntries(new URLSearchParams(urlEncoded));
}