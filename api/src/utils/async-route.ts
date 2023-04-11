import { NextFunction, Request, Response } from "express"

type Route = (req: Request, res: Response) => void

const asyncRoute = (route: Route) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(route(req, res)).catch(next)

export default asyncRoute