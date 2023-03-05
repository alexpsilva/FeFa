import Link from "next/link";
import { useEffect, useState } from "react";
import BaseModel from "@/types/model/base"
import TypeFieldSpecification from "./types/field";
import Button from "../button";
import updateArray from "@/utils/update-array";
import deleteFromArray from "@/utils/delete-from-array";

interface InlineAction<T> {
  icon?: string
  label: string
  onClick: (itemId: string) => Promise<T | void>
}

interface Props<T extends BaseModel> {
  fields: TypeFieldSpecification<T>[]
  listItems: () => Promise<T[]>
  redirectPath: (itemId: string) => string
  inlineActions?: InlineAction<T>[]
}

function RedirectTable<T extends BaseModel>(
  { fields, listItems, redirectPath, inlineActions }: Props<T>
) {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await listItems()
        .then((response: T[]) => setData(response))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false))
    }

    fetchData()
  }, [])

  if (isLoading) { return <h3>Loading...</h3> }
  if (error) { return <h3>Error: {error.message}</h3> }

  const inlineActionOnClickHandler = async (action: InlineAction<T>, itemId: string) => {
    const newItem = await action.onClick(itemId)

    newItem ?
      setData(updateArray(data, (item) => item.id == itemId, newItem))
      : setData(deleteFromArray(data, (item) => item.id == itemId))
  }
  const inlineActionsArray = inlineActions ? inlineActions : []

  return (
    <table>
      <thead>
        <tr>
          <>
            {fields.map(field => (
              <th key={field.key}>{field.title}</th>
            ))}
            {inlineActionsArray.length ? <th></th> : null}
          </>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <>
              {fields.map(field => (
                <td key={field.key}>
                  <Link href={redirectPath(item.id)}>
                    {field.stringify ?
                      field.stringify(item[field.key])
                      : String(item[field.key])
                    }
                  </Link>
                </td>
              ))}
              <td>
                {inlineActionsArray.map((action, index) => (
                  <Button
                    key={index}
                    text={action.label}
                    onClick={() => inlineActionOnClickHandler(action, item.id)}
                  />
                ))}
              </td>
            </>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RedirectTable