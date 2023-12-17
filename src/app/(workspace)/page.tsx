import protectedPage from "@/utils/auth/protected-page"

const Home = protectedPage(() => {
  return (
    <h1 className='text-3xl font-bold text-center text-skin-selected'>
      Welcome to Fefa!
    </h1>
  )
})

export default Home