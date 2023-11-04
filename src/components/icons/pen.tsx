import { SVGAttributes } from "react"

type SVGProps = SVGAttributes<SVGSVGElement>

export default function PenIcon(props: SVGProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      strokeWidth='2'
      {...props}
    >
      <polygon
        points='19,1 2,18 1,23 6,22 23,5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <path
        d='M16 4 L20 8'
        fill='none'
      />
    </svg>
  )
}