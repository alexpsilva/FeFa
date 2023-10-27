import Button from "@/components/ui/button"
import Pacient, { PacientSchema } from "@/types/model/pacient"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import authenticatedRequest from "@/auth/authenticated-request"
import PacientSheet from "@/components/features/pacient-sheet.tsx"
import useRequestWhileLoading from "@/hooks/useRequestWhileLoading"

function CreatePacient() {
  const router = useRouter()
  const [data, setData] = useState<Partial<Pacient>>({})
  const whileLoading = useRequestWhileLoading()

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    const createRequest = () => authenticatedRequest(
      '/pacients',
      PacientSchema,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )

    const { response, error } = await whileLoading(
      createRequest,
      {
        loading: 'Criando...',
        success: 'Paciente criado com sucesso',
        failure: 'Falha ao criar paciente',
      },
    )

    if (!error) {
      router.push(`/pacient/${response.id}`)
    }
  }

  const onCancelHandler = () => { router.back() }

  return (
    <>
      <Head>
        <title>Pacient</title>
      </Head>
      <PacientSheet
        pacient={data}
        setPacient={setData}
      />
      <div style={{ float: 'right' }}>
        <Button text="Criar" disabled={!data.name} onClick={onCreateHandler} />
        <Button text="Cancelar" onClick={onCancelHandler} />
      </div>
    </>
  )
}

export default CreatePacient