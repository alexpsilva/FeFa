import ArrowIcon from "./icons/arrow";

export default function PaginationControls({ pageNumber, pageSize, totalCount, href, ...props } : {
    pageNumber: number, 
    pageSize: number,
    totalCount: number,
    href: string,
} & React.ComponentProps<'div'>) {
    const numPages = Math.ceil(totalCount / pageSize)
    const croppedPageNumber = pageNumber > numPages ? numPages : pageNumber;
    const previousPageUrl = croppedPageNumber <= 1 ? null : buildUrl(href, croppedPageNumber - 1, pageSize)
    const nextPageUrl = croppedPageNumber === numPages ? null : buildUrl(href, croppedPageNumber + 1, pageSize)

    return (
        <div className="flex-row" {...props}>
            {!previousPageUrl ? null : (
                <a href={previousPageUrl} className="padding-md border-radius content-evidence flex-items-center">
                    <ArrowIcon direction="left" width="1.5rem" height="1.5rem"/>
                </a>
            )}
            <span className="padding-md flex-items-center">{croppedPageNumber}/{numPages}</span>
            {!nextPageUrl ? null : (
                <a href={nextPageUrl} className="padding-md border-radius content-evidence flex-items-center">
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