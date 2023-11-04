'use client'

import { createContext, Dispatch, useContext } from "react";
import { SplitScreenAction, SplitScreenState } from "./type";


const SplitScreenContext = createContext<SplitScreenState | null>(null)

const useSplitScreen = () => {
  const context = useContext(SplitScreenContext)
  if (!context) {
    throw new Error(
      "useSplitScreen() cannot be used outside of a SplitScreenProvider"
    )
  }

  return context
}

const SplitScreenDispatchContext = createContext<Dispatch<SplitScreenAction> | null>(null)

const useSplitScreenDispatch = () => {
  const context = useContext(SplitScreenDispatchContext)
  if (!context) {
    throw new Error(
      "useSplitScreenDispatch() cannot be used outside of a SplitScreenDispatchProvider"
    )
  }

  return context
}

export {
  useSplitScreen,
  useSplitScreenDispatch,
  SplitScreenContext,
  SplitScreenDispatchContext,
}