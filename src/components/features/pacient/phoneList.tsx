'use client'

import TrashIcon from "@/components/icons/trash"
import Stacked from "@/components/layout/stacked"
import Input from "@/components/ui/input"
import PhoneInput from "@/components/ui/input/phone"
import Label from "@/components/ui/label"
import { Phone } from "@/types/model/pacient"
import { ComponentProps, useState } from "react"

type Props = {
  defaultValues?: Partial<Phone>[]
  readOnly?: boolean
} & ComponentProps<typeof Stacked>

const PhoneList = ({ defaultValues, readOnly, ...props }: Props) => {
  const [phoneIds, setPhoneIds] = useState(defaultValues?.map(phone => phone.id) ?? [])

  const addIndex = () => {
    setPhoneIds([...phoneIds, undefined])
  }

  const removeIndex = (removeIndex: number) => {
    setPhoneIds([...phoneIds.slice(0, removeIndex), ...phoneIds.slice(removeIndex + 1)])
  }

  return (
    <Stacked {...props}>
      <Label htmlFor="phone">Telefones</Label>
      <Stacked className="gap-1">
        {phoneIds.map((phoneId, index) => (
          <div
            key={phoneId ?? `new_${index}`}
            className="flex flex-row gap-2 items-center"
          >
            <Input name={`phones[${index}][id]`} value={phoneId} readOnly hidden />
            <PhoneInput
              name={`phones[${index}][number]`}
              className="w-[13.5ch]"
              readOnly={readOnly}
              initial={defaultValues?.find((phone) => phone.id == phoneId)?.number}
            />
            {readOnly
              ? null
              : <TrashIcon
                width="24"
                height="24"
                className="stroke-skin-selected cursor-pointer"
                onClick={() => removeIndex(index)}
              />
            }
          </div>
        ))}
        {readOnly
          ? null
          : <span
            className="
            inline-block w-fit
            text-skin-selected font-bold 
            cursor-pointer"
            onClick={addIndex}
          >
            + Novo Telefone
          </span>
        }
      </Stacked>
    </Stacked>
  )
}

export default PhoneList