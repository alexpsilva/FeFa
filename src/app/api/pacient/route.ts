import { createPacient } from "@/database/pacient";
import { WritablePacientSchema } from "@/types/model/pacient";
import protectedRoute from "@/utils/auth/protected-route";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";


const POST = protectedRoute(async (request: NextRequest, userId: number) => {
  const body = WritablePacientSchema.parse(await request.json())
  const pacient = await createPacient(userId, body)

  return NextResponse.json(
    pacient,
    { status: StatusCodes.CREATED },
  )
})

export { POST }