export default function SaveIcon(props: React.
    ComponentProps<'svg'>) {
    return (
        <svg
            viewBox='0 0 24 24'
            strokeWidth='2'
            fill='none'
            {...props}
        >
            <polygon
                points='
                    21, 7
                    21, 21
                    4, 21
                    4, 3
                    17, 3
                '
                strokeLinejoin='round'
            />
            <rect width="10" height="8" x="7" y="13"/>
            <rect width="8" height="5" x="8" y="3"/>
        </svg>
    )
}


