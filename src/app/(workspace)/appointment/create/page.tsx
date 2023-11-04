import Button from "@/components/ui/button"
import { Metadata } from "next"
import MedicalRecord from "../record"
import CreateForm from "./form"

export const metadata: Metadata = { title: 'Criar Consulta' }

const CreateAppointment = async () => {
  return (
    <main className="p-4">
      <CreateForm>
        {/* <MedicalRecord date={new Date()} /> */}
        <Button type="submit">Salvar</Button>
        <Button type="link" href="/appointment">Cancelar</Button>
      </CreateForm>
    </main>
  )
}

export default CreateAppointment