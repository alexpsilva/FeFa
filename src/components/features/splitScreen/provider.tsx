'use client'

import { ReactNode, useReducer } from "react"
import splitScreenReducer from "./reducer"
import { SplitScreenContext, SplitScreenDispatchContext } from "./context"

type Props = { children: ReactNode }
const SplitScreenProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(splitScreenReducer, {})

  return <SplitScreenContext.Provider value={state}>
    <SplitScreenDispatchContext.Provider value={dispatch}>
      {children}
    </SplitScreenDispatchContext.Provider>
  </SplitScreenContext.Provider>
}

export default SplitScreenProvider