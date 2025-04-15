import type { APIRoute } from "astro";

import formDataToJson from "@core/shared/utils/formDataToJson";
import { CreateMedicationSchema } from "@core/medication/types";
import { medicationRepository } from "src";

export const POST: APIRoute = async ({ request, locals }) => {
    const formData = formDataToJson(await request.formData());
    const { data, error, success } = CreateMedicationSchema.safeParse({...formData, userId: locals.userId});
    if (!success) {
        return new Response(JSON.stringify({ error }), { status: 400 });
    }

    const medication = await medicationRepository.create(data);
    return new Response(null, { status: 201, headers: { 'X-Redirect-To': `/medication/${medication.id}` } });
};
