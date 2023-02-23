import React from "react"

interface Props {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button = ({ text, onClick, disabled }: Props) => {
  return <button
    type="button"
    onClick={onClick}
    disabled={disabled}>
    {text}
  </button>
}

export default Button