export default function SearchIcon({ ...props }) {
  return (
    <svg
      viewBox='0 0 24 24'
      strokeWidth='3'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <circle id='Glass' cx='10' cy='10' r='7' fill='none' />
      <line id='Handle' x1='16' y1='16' x2='22' y2='22' fill='none' />
    </svg>
  )
}