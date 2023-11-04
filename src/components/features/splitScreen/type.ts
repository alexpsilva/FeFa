import { ReactNode } from "react"

interface SplitScreenState {
  secondary?: ReactNode
}

type SplitScreenAction =
  | { type: 'setSecondary', payload: ReactNode }
  | { type: 'removeSecondary' }

export type { SplitScreenState, SplitScreenAction }