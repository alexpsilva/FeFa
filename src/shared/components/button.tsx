type ButtonInnerHTMLTag = "button" | "a"

export default function Button<T extends ButtonInnerHTMLTag>({htmlTag, children, className, ...props}: {htmlTag: T} & React.ComponentProps<T>) {
    const mergedClassName = `padding-md border-radius content-evidence flex-row flex-items-center gap-sm ${className ?? ''}`;

    if(htmlTag === 'button') {
        return <button className={mergedClassName} {...props as React.ComponentProps<"button">}>{children}</button>;
    } else if(htmlTag === 'a') {
        return <a className={mergedClassName} {...props as React.ComponentProps<"a">}>{children}</a>;
    }    
}