export default function Anchor({children, className, ...props}: React.ComponentProps<'a'>) {
    const mergedClassName = `padding-md border-radius content-evidence flex-row flex-items-center gap-sm ${className ?? ''}`;

    return <a className={mergedClassName} {...props}>{children}</a>;
}