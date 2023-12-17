import { deletePacient, updatePacient } from "@/database/pacient";
import { WritablePacientSchema } from "@/types/model/pacient";
import protectedRoute from "@/utils/auth/protected-route";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const Params = z.object({ params: z.object({ pacientId: z.coerce.number() }) })
type Params = z.infer<typeof Params>

const PATCH = protectedRoute(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { pacientId } } = Params.parse(params)
  const body = WritablePacientSchema.parse(await request.json())

  const { pacient, error } = await updatePacient(userId, pacientId, body)
  if (error) {
    return NextResponse.json(
      error,
      { status: StatusCodes.BAD_REQUEST }
    )
  }

  return NextResponse.json(pacient)
})

const DELETE = protectedRoute(async (request: NextRequest, userId: number, params: Params) => {
  const { params: { pacientId } } = Params.parse(params)

  const { error } = await deletePacient(userId, pacientId)
  if (error) {
    return NextResponse.json(
      error,
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  return new NextResponse()
})

export { PATCH, DELETE }