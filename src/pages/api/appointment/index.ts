import type { APIRoute } from "astro";

import { CreateAppointmentSchema } from "@core/appointment/types";
import { appointmentRepository } from "src";
import formDataToJson from "@core/shared/utils/formDataToJson";

export const POST: APIRoute = async ({ request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const { data, error, success } = CreateAppointmentSchema.safeParse({...formData, userId: locals.userId});
    if (!success) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }

    const appointment = await appointmentRepository.create(data);
    return new Response(null, { status: 201, headers: { 'X-Redirect-To': `/appointment/${appointment.id}` } });
};
