'use client'
// Necessary because the 'react-textarea-autosize lib uses react hooks to resize the <textarea/>

import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import TextareaAutosize from 'react-textarea-autosize'

type TextAreaProps = ComponentProps<typeof TextareaAutosize>

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return <TextareaAutosize
    className={twMerge(
      `text-lg 
      autofill:bg-transparent outline-none 
      border-b-2 border-b-skin-base
      focus:border-b-skin-selected
      read-only:border-b-0
      resize-none
      `,
      className,
    )}
    {...props}
  />
}

export default TextArea