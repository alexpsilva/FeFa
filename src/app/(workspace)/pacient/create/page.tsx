import { Metadata } from "next"

import CreateForm from "./form"
import Button from "@/components/ui/button"
import PacientCard from "@/components/features/pacient/card"

export const metadata: Metadata = { title: 'Criar Paciente' }

export default async function CreatePacient() {
  return (
    <main className="p-6 pt-8">
      <CreateForm className="flex flex-col gap-4 mx-auto max-w-5xl">
        <PacientCard />
        <div className="self-end flex gap-2 pr-2">
          <Button type='submit' className="bg-skin-selected text-white">Salvar</Button>
          <Button type='link' href='/pacient'>Cancelar</Button>
        </div>
      </CreateForm>
    </main>
  )
}