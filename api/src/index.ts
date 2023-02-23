import express, { Express, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import loggerMiddleware from './middlewares/logger'
import errorMiddleware from './middlewares/error'
import Pacient from './routes/pacient'
import cors from 'cors'
import Insurance from './routes/insurance'

const app: Express = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use(loggerMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK)
  res.send(ReasonPhrases.OK)
})

app.use('/pacient', Pacient)
app.use('/insurance', Insurance)

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND)
  res.send(ReasonPhrases.NOT_FOUND)
})

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})