import { POSTGRES_URL, POSTGRES_SCHEMA, JWT_SECRET, JWT_EXPIRES_IN, GOOGLE_CLIENT_ID, LOG_LEVEL } from '$env/static/private'

export default class Config {
    readonly databaseUrl = POSTGRES_URL;
    readonly databaseSchema = POSTGRES_SCHEMA;

    readonly logLevel = LOG_LEVEL || "debug";

    readonly jwtSecret = JWT_SECRET;
    readonly jwtExpiresIn = JWT_EXPIRES_IN;
    readonly googleClientId = GOOGLE_CLIENT_ID;

    readonly pacientListDefaultPageSize = 10;
    readonly pacientAppointmentsListDefaultPageSize = 5;
    readonly appointmentListDefaultPageSize = 10;
    readonly medicationListDefaultPageSize = 10;
};