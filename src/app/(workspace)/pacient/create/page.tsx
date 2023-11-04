import { Metadata } from "next"

import CreateForm from "./form"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input/input"
import DateInput from "@/components/ui/input/date"
import CpfInput from "@/components/ui/input/cpf"
import ContentCard from "@/components/layout/contentCard"
import Label from "@/components/ui/label"
import Stacked from "@/components/layout/stacked"
import PhoneList from "../phoneList"

export const metadata: Metadata = { title: 'Criar Paciente' }

export default async function CreatePacient() {
  return (
    <main className="p-6 pt-8">
      <CreateForm
        className="flex flex-col gap-4 
        mx-auto max-w-5xl
        text-skin-base stroke-skin-base"
      >
        <ContentCard
          className="grid grid-rows-4 grid-cols-2 grid-flow-row 
            gap-y-4 gap-x-8"
        >
          <Stacked>
            <Label htmlFor="name">Nome</Label>
            <Input name="name" required />
          </Stacked>
          <Stacked>
            <Label htmlFor="birthday">Data de nascimento</Label>
            <DateInput
              name="birthday"
              className="w-[13ch]"
              required
            />
          </Stacked>
          <Stacked className="col-span-2">
            <Label htmlFor="note">Nota</Label>
            <Input name="note" />
          </Stacked>
          <Stacked>
            <Label htmlFor="cpf">CPF</Label>
            <CpfInput
              name="cpf"
              className="w-[13ch]"
            />
          </Stacked>
          <Stacked>
            <Label htmlFor="address">Endereço</Label>
            <Input name="address" />
          </Stacked>
          <PhoneList className="row-start-3 col-start-2 row-span-2 " />
        </ContentCard>
        <div className="self-end flex gap-2 pr-2">
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          <Button type='link' href='/pacient'>Cancelar</Button>
        </div>
      </CreateForm>
    </main>
  )
}