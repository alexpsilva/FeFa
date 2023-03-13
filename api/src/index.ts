import express, { Express, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import loggerMiddleware from './middlewares/logger'
import errorMiddleware from './middlewares/error'
import cors from 'cors'
import Auth from './routes/auth'
import Appointment from './routes/appointment'
import Insurance from './routes/insurance'
import Pacient from './routes/pacient'

const app: Express = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use(loggerMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK)
  res.send(ReasonPhrases.OK)
})

app.use('/auth', Auth)
app.use('/appointments', Appointment)
app.use('/pacients', Pacient)
app.use('/insurances', Insurance)

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND)
  res.send(ReasonPhrases.NOT_FOUND)
})

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})