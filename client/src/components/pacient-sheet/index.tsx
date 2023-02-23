import Button from "@/components/button"
import ModelTextInput from "@/components/model-text-input"
import MultitabFrame from "@/components/multitab-frame"
import TabItem from "@/components/multitab-frame/tab-item"
import Pacient, { getEmptyPacientToCreate, PacientToCreate } from "@/types/pacient"
import useDraft from "@/hooks/useDraft"
import { useEffect, useState } from "react"
import { createPacient, getPacient, updatePacient } from "@/pages/pacient/api"

interface Props {
  pacientId?: string
  onCancel?: () => void
}

function PacientSheet(
  { pacientId, onCancel }: Props
) {
  const emptyPacient = getEmptyPacientToCreate()
  const [isDraft, pacient, setPacient, discardDraft] = useDraft<PacientToCreate>(emptyPacient)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fetchData = () => {
      if (!pacientId) { return }

      setIsLoading(true)
      getPacient(pacientId)
        .then((response: Pacient) => setPacient(response, { save: true }))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false))
    }

    fetchData()
  }, [pacientId])

  if (error) { return <h3>Error: {error.message}</h3> }
  if (isLoading) { return <h3>Loading...</h3> }


  const onSaveHandler = () => {
    const saveMethod = !pacientId ? createPacient : updatePacient

    setIsLoading(true)
    saveMethod(pacient)
      .then((response) => setPacient(response, { save: true }))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }

  const onCancelHandler = () => {
    discardDraft()
    if (onCancel) { onCancel() }
  }

  return (
    <div>
      <ModelTextInput field="name" value={pacient} setValue={setPacient} />
      <MultitabFrame>
        <TabItem tabName="History">
          <h3>First tab!</h3>
        </TabItem>
        <TabItem tabName="Personal">
          <label>
            CPF: <ModelTextInput field="cpf" value={pacient} setValue={setPacient} />
          </label>
        </TabItem>
        <TabItem tabName="Contact">
          <label>
            Rua <ModelTextInput field="addressStreet" value={pacient} setValue={setPacient} />
          </label>
        </TabItem>
      </MultitabFrame>
      <div style={{ float: 'right' }}>
        <Button text="Salvar" disabled={!isDraft} onClick={onSaveHandler} />
        <Button text="Cancelar" disabled={!isDraft && !!pacientId} onClick={onCancelHandler} />
      </div>
    </div>
  )
}

export default PacientSheet