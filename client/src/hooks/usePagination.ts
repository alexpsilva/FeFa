import { Dispatch, Reducer, useReducer } from "react"

type PaginationAction =
  // | { type: 'set-size', payload: number }
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'to-index', payload: number }

interface InternalState {
  currentIndex: number
}

interface Page {
  index: number
  offset: number
}

interface PaginationState {
  previous: Page | null
  current: Page
  next: Page | null
  totalPages: number
}

const usePagination = (
  totalElements: number, pageSize: number
): [PaginationState, Dispatch<PaginationAction>] => {
  const totalPages = Math.ceil(totalElements / pageSize)
  const hasPrevious = (index: number) => index > 1
  const hasNext = (index: number) => index < totalPages

  const reducer = (state: InternalState, action: PaginationAction): InternalState => {
    const { type } = action
    switch (type) {
      case 'previous': return hasPrevious(state.currentIndex)
        ? { ...state, currentIndex: state.currentIndex - 1 }
        : state

      case 'next': return hasNext(state.currentIndex)
        ? { ...state, currentIndex: state.currentIndex + 1 }
        : state

      case 'to-index': return action.payload >= 1 && action.payload <= totalPages
        ? { ...state, currentIndex: action.payload }
        : state
    }
  }

  const [state, dispatch] = useReducer<Reducer<InternalState, PaginationAction>>(
    reducer,
    { currentIndex: 1 } as InternalState
  )

  const calculatePage = (index: number): Page => ({ index, offset: (index - 1) * pageSize })

  const previous = hasPrevious(state.currentIndex)
    ? calculatePage(state.currentIndex - 1)
    : null

  const current = calculatePage(state.currentIndex)

  const next = hasNext(state.currentIndex)
    ? calculatePage(state.currentIndex + 1)
    : null

  return [
    { previous, current, next, totalPages },
    dispatch,
  ]
}

export type { PaginationAction, PaginationState }
export default usePagination