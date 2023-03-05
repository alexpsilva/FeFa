import { InlineActionSpecification } from "@/components/tables/inline-action";
import BaseModel from "@/types/model/base";
import { Dispatch } from "react";
import useArray, { Action } from "./useArray";

type Result<T extends BaseModel> = [
  T['id'][],
  Dispatch<Action<T['id']>>,
  InlineActionSpecification<T>
]

const useInlineDelayedDelete = <T extends BaseModel>(): Result<T> => {
  const [{ data }, toDeleteDispatch] = useArray<T['id']>()

  const inlineAction: InlineActionSpecification<T> = {
    label: 'Delete',
    onClick: i => i.id && toDeleteDispatch({ type: 'add', payload: i.id }),
    isEligible: i => !!i.id && !data.includes(i.id)
  }

  return [data, toDeleteDispatch, inlineAction]
}

export default useInlineDelayedDelete