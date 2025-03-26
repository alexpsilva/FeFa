export default function Button({overlay, children, className, ...props}: {overlay?: React.ReactNode} & React.ComponentProps<'button'>) {
    let mergedClassName = `padding-md border-radius content-evidence flex-row flex-items-center gap-sm ${className ?? ''}`;
    if (overlay) {
        mergedClassName += ' relative-container';
    }

    return <button className={mergedClassName} {...props}>
        {children}
        {overlay 
            ? <div className="absolute-center">{overlay}</div>
            : null
        }
    </button>;
}