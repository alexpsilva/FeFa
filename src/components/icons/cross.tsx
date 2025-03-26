export default function CrossIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            viewBox='0 0 24 24'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            {...props}
        >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <line x1='2' y1='2' x2='20' y2='20' />
            <line x1='2' y1='20' x2='20' y2='2' />
        </svg>
    )
}