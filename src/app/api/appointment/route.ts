import { createAppointment } from "@/database/appointment";
import { WritableAppointmentWithPacientIdSchema } from "@/types/model/appointment";
import protectedRoute from "@/utils/auth/protected-route";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

const POST = protectedRoute(async (request: NextRequest, userId: number) => {
  const body = WritableAppointmentWithPacientIdSchema.parse(await request.json())

  const {
    appointment,
    error,
  } = await createAppointment(userId, body)
  if (error) {
    return NextResponse.json(
      error,
      { status: StatusCodes.BAD_REQUEST },
    )
  }

  return NextResponse.json(
    appointment,
    { status: StatusCodes.CREATED },
  )
})

export { POST }