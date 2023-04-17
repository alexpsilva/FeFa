import { Reducer, useReducer } from "react"

type Action<T> =
  | { type: 'clear' }
  | { type: 'add', payload: T }

interface State<T> {
  data: T[]
}

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  const { type } = action
  switch (type) {
    case 'clear': return { data: [] }
    case 'add': return { data: [...state.data, action.payload] }
  }
}

const useArray = <T,>() => useReducer<Reducer<State<T>, Action<T>>>(
  reducer,
  { data: [] },
)

export type { Action, State }
export default useArray