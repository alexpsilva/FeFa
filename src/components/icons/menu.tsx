import { SVGAttributes } from "react"

type SVGProps = SVGAttributes<SVGSVGElement>

export default function MenuIcon(props: SVGProps) {
  return (
    <svg
      viewBox='0 0 45 30'
      strokeWidth='3'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path
        d='M3 3 H42 M3 15 H42 M3 27 H42'
        fill='none'
      />
    </svg>
  )
}