import dotenv from "dotenv";
import { mandatoryEnv } from "./mandatory_env";

dotenv.config();

export default class Config {
    readonly databaseUrl = mandatoryEnv("POSTGRES_URL");
    readonly databaseSchema = mandatoryEnv("POSTGRES_SCHEMA");

    readonly port = Number(mandatoryEnv("PORT"));

    readonly logLevel = process.env.LOG_LEVEL || "debug";

    readonly jwtSecret = mandatoryEnv("JWT_SECRET");
    readonly jwtExpiresIn = mandatoryEnv("JWT_EXPIRES_IN");
    readonly googleClientId = mandatoryEnv("GOOGLE_CLIENT_ID");

    readonly pacientListDefaultPageSize = 10;
    readonly pacientAppointmentsListDefaultPageSize = 5;
    readonly appointmentListDefaultPageSize = 10;
    readonly treatmentListDefaultPageSize = 10;
};