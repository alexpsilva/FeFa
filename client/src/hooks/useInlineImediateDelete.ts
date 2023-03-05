import { InlineActionSpecification } from "@/components/tables/inline-action";
import BaseModel from "@/types/model/base"
import deleteFromArray from "@/utils/delete-from-array"

const useInlineImediateDelete = <T extends BaseModel>(
  data: T[],
  setData: (newData: T[]) => void,
): InlineActionSpecification<T> => ({
  label: 'Delete',
  onClick: i => i.id && setData(
    deleteFromArray(
      data,
      j => i.id == j.id
    )
  )
})

export default useInlineImediateDelete