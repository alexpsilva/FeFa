import PacientSheet from "@/components/pacient-sheet"
import Head from "next/head"
import { useRouter } from "next/router"

function EditPacient() {
  const router = useRouter()
  if (!router.isReady) { return <h3>Loading...</h3> }

  const pacientId = router.query.pacientId as string

  return (
    <>
      <Head>
        <title>Pacient</title>
      </Head>
      <PacientSheet onCancel={() => router.push('/pacient')} />
    </>
  )
}

export default EditPacient