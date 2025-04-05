import snakeToCamelCase from "./snakeToCamelCase";

export default function formDataToJson(formData: FormData): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    formData.forEach((value, keySnakeCase) => {
        const key = snakeToCamelCase(keySnakeCase);

        if (key in json) {
            if (Array.isArray(json[key])) {
                (json[key] as unknown[]).push(value);
            } else {
                json[key] = [json[key], value];
            }
        } else {
            json[key] = value;
        }
    });
    return json;
}