import { Reducer, useReducer } from "react"

type Action<T> =
  | { type: 'discard' }
  | { type: 'draft', payload: T }
  | { type: 'save', payload: T }

interface State<T> {
  saved: T
  draft: T
  isDrafting: boolean
}

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  const { type } = action
  switch (type) {
    case 'discard': return { ...state, draft: state.saved, isDrafting: false }
    case 'draft': return { ...state, draft: action.payload, isDrafting: true }
    case 'save': return { saved: action.payload, draft: action.payload, isDrafting: false }
  }
}

const useDraft = <T,>(initial: T) => useReducer<Reducer<State<T>, Action<T>>>(
  reducer,
  { saved: initial, draft: initial, isDrafting: false },
)

export default useDraft