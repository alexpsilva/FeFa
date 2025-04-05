import type { APIRoute } from "astro";

import formDataToJson from "@core/shared/utils/formDataToJson";
import tryCatch from "@core/shared/utils/tryCatch";
import { DeleteAppointmentSchema, UpdateAppointmentSchema } from "@core/appointment/types";
import { appointmentRepository } from "src";

export const DELETE: APIRoute = async ({ params, locals }) => {
    const parseResult = DeleteAppointmentSchema.safeParse({id: params.appointmentId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }
    const { id, userId } = parseResult.data;  

    const repositoryResult = await tryCatch(appointmentRepository.delete(userId, id));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/appointment` } });
}

export const PUT: APIRoute = async ({ params, request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const parseResult = UpdateAppointmentSchema.safeParse({...formData, id: params.appointmentId, userId: locals.userId});
    if (!parseResult.success) {
        return new Response(JSON.stringify({ error: parseResult.error }), { status: 400 });
    }

    const repositoryResult = await tryCatch(appointmentRepository.update(parseResult.data));
    if (!repositoryResult.success) {
        return new Response(JSON.stringify({ error: repositoryResult.error }), { status: 500 });
    }

    return new Response(null, { status: 204, headers: { 'X-Redirect-To': `/appointment/${params.appointmentId}` } });
}