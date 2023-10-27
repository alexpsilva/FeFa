'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
// import { useFormStatus } from 'react-dom'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const SearchInputSubmit = ({ children, ...props }: ButtonProps) => {
  // const { pending } = useFormStatus()

  return (
    // <button type='submit' aria-disabled={pending} {...props}>
    <button type='submit' {...props}>
      {children}
    </button>
  )
}

export default SearchInputSubmit