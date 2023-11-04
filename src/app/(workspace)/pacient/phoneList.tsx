'use client'

import TrashIcon from "@/components/icons/trash"
import Stacked from "@/components/layout/stacked"
import PhoneInput from "@/components/ui/input/phone"
import Label from "@/components/ui/label"
import { ComponentProps, useState } from "react"

type Props = ComponentProps<typeof Stacked>

const PhoneList = (props: Props) => {
  const [indices, setIndices] = useState([0])
  const lastIndex = indices.at(-1)

  const addIndex = () => {
    if (typeof lastIndex === 'number') {
      setIndices([...indices, lastIndex + 1])
    }
    else { setIndices([0]) }
  }

  const removeIndice = (toRemove: number) => {
    setIndices(indices.filter((i) => i !== toRemove))
  }

  return (
    <Stacked {...props}>
      <Label htmlFor="phone">Telefones</Label>
      <Stacked className="gap-1">
        {indices.map(i => (
          <div key={i} className="flex flex-row gap-2 items-center">
            <PhoneInput
              name={`phone.${i}`}
              className="w-[13.5ch]"
            />
            <TrashIcon
              width="24"
              height="24"
              className="stroke-skin-selected cursor-pointer"
              onClick={() => removeIndice(i)}
            />
          </div>
        ))}
        <span
          className="
            inline-block w-fit
            text-skin-selected font-bold 
            cursor-pointer"
          onClick={addIndex}
        >
          + Novo Telefone
        </span>
      </Stacked>
    </Stacked>
  )
}

export default PhoneList