import { SVGAttributes } from "react"

type SVGProps = SVGAttributes<SVGSVGElement>
interface Props {
  direction: 'up' | 'down' | 'left' | 'right'
}

export default function ArrowHeadIcon({ direction, ...props }: Props & SVGProps) {
  let rotation: number
  switch (direction) {
    case 'up': rotation = 0; break;
    case 'right': rotation = 90; break;
    case 'down': rotation = 180; break;
    case 'left': rotation = 270; break;
  }

  return (
    <svg
      viewBox='0 0 40 20'
      strokeWidth='4'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path
        transform={`rotate(${rotation}, 20, 10)`}
        d='M1 19 L20 1 L39 19'
        fill='none'
      />
    </svg>
  )
}