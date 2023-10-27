import { SVGAttributes } from "react"

type SVGProps = SVGAttributes<SVGSVGElement>
interface Props {
  direction: 'up' | 'down' | 'left' | 'right'
}

export default function ArrowIcon({ direction, ...props }: Props & SVGProps) {
  let rotation: number
  switch (direction) {
    case 'up': rotation = 0; break;
    case 'right': rotation = 90; break;
    case 'down': rotation = 180; break;
    case 'left': rotation = 270; break;
  }

  return (
    <svg
      viewBox='0 0 25 25'
      strokeWidth='3'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path
        transform={`rotate(${rotation}, 13, 13)`}
        d='M13 23 V2 L7 8 M13 2 L19 8'
        fill='none'
      />
    </svg>
  )
}