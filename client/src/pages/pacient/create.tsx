import Button from "@/components/button"
import PacientSheet from "@/components/pacient-sheet"
import Pacient from "@/types/model/pacient"
import fetchAPI from "@/utils/fetch-api"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

function CreatePacient() {
  const router = useRouter()
  const [data, setData] = useState<Partial<Pacient>>({})

  if (!router.isReady) { return <h3>Loading...</h3> }

  const onCreateHandler = async () => {
    const [created, error] = await fetchAPI('/pacients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    router.push(`/pacient/${created.id}`)
  }

  const onCancelHandler = () => { router.back() }

  return (
    <>
      <Head>
        <title>Pacient</title>
      </Head>
      <PacientSheet
        data={data}
        setData={setData}
      />
      <div style={{ float: 'right' }}>
        <Button text="Criar" disabled={!data.name} onClick={onCreateHandler} />
        <Button text="Cancelar" onClick={onCancelHandler} />
      </div>
    </>
  )
}

export default CreatePacient