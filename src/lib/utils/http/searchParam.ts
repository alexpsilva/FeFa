export default function searchParam(url: URL, param: string): string | undefined {
    if (url.searchParams.has(param)) {
        return url.searchParams.get(param) as string;
    }
    return undefined;
}