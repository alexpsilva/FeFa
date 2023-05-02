import Button from "@/components/ui/button"
import Pacient from "@/types/model/pacient"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import authenticatedRequest from "@/auth/authenticated-request"
import PacientSheet from "@/components/features/pacient-sheet.tsx"
import useNotify from "@/hooks/notifications/useNotify"

function CreatePacient() {
  const router = useRouter()
  const notify = useNotify()
  const [data, setData] = useState<Partial<Pacient>>({})

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    notify({ id: 'PACIENT_SAVE', 'text': 'Salvando...' })
    const { response: created } = await authenticatedRequest('/pacients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    notify({ id: 'PACIENT_SAVE', 'text': 'Salvo com sucesso', 'expiresInSeconds': 3 })
    router.push(`/pacient/${created.id}`)
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