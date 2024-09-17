export default function Spinner({className, ...props}: React.ComponentProps<'svg'>) {
    const mergedClassName = `spinner ${className ?? ''}`
    return (
        <svg viewBox="0 0 58 58" className={mergedClassName} {...props}>
            <circle cx="42.601" cy="11.462" r="5" stroke="none" fill-opacity="0.4"/>
            <circle cx="49.063" cy="27.063" r="5" stroke="none" fill-opacity="0.6"/>
            <circle cx="42.601" cy="42.663" r="5" stroke="none" fill-opacity="0.8"/>
            <circle cx="27" cy="49.125" r="5" stroke="none" fill-opacity="1"/>
        </svg>
    )
}
