const useLoadWhile = (
  setError: (e: Error) => void,
  setLoading: (loading: boolean) => void,
) => async (asyncFunc: any) => {
  setLoading(true)
  return asyncFunc()
    .catch((e: Error) => setError(e))
    .finally(() => setLoading(false))
}

export default useLoadWhile