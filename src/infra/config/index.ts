import dotenv from "dotenv";
import path from "path";
import { mandatoryEnv } from "./mandatory_env";

dotenv.config();

export default class Config {
    readonly staticFolder = path.join(__dirname, "..", "..", "..", "public");
    
    readonly databaseUrl = mandatoryEnv("POSTGRES_URL");

    readonly port = Number(mandatoryEnv("PORT"));

    readonly logLevel = process.env.LOG_LEVEL || "debug";

    readonly jwtSecret = mandatoryEnv("JWT_SECRET");
    readonly jwtExpiresIn = mandatoryEnv("JWT_EXPIRES_IN");
    readonly googleClientId = mandatoryEnv("GOOGLE_CLIENT_ID");
};