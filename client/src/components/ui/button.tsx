import React from "react"

interface Props {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button = ({ text, onClick, disabled }: Props) => {
  return <button
    className="m-1 px-2 bg-slate-200 hover:bg-slate-400 cursor-pointer"
    type="button"
    onClick={onClick}
    disabled={disabled}>
    {text}
  </button>
}

export default Button