import { SplitScreenAction, SplitScreenState } from "./type"

const splitScreenReducer = (
  state: SplitScreenState,
  action: SplitScreenAction
): SplitScreenState => {
  switch (action.type) {
    case 'setSecondary': return { ...state, secondary: action.payload }
    case 'removeSecondary': return { ...state, secondary: undefined }
    default: throw Error(`Unknown action: ${action}`)
  }
}

export default splitScreenReducer