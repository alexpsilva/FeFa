import ArrowIcon from "./icons/arrow";

export default function PaginationControls({ pageNumber, pageSize, totalCount, href } : {
    pageNumber: number, 
    pageSize: number,
    totalCount: number,
    href: string,
}) {
    const numPages = Math.ceil(totalCount / pageSize)
    const previousPageUrl = pageNumber === 1 ? null : buildUrl(href, pageNumber - 1, pageSize)
    const nextPageUrl = pageNumber === numPages ? null : buildUrl(href, pageNumber + 1, pageSize)

    return (
        <div className="flex-row">
            {!previousPageUrl ? null : (
                <a href={previousPageUrl} className="padding-x-md border-radius content-evidence flex-items-center">
                    <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
                </a>
            )}
            <span className="padding-x-md flex-items-center">{pageNumber}/{numPages}</span>
            {!nextPageUrl ? null : (
                <a href={nextPageUrl} className="padding-x-md border-radius content-evidence flex-items-center">
                    <ArrowIcon direction="right" width="1.5rem" height="1.5rem"/>
                </a>
            )}
        </div>
    )
}

function buildUrl(href: string, pageNumber: number, pageSize: number) {
    let url = new String(href)
    if (url.includes('?')) {
        url += '&'
    } else {
        url += '?'
    }

    return `${url}pageNumber=${pageNumber}&pageSize=${pageSize}`
}