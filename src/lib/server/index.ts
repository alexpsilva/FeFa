import Config from "$lib/server/infra/config";

import Logger from "$lib/server/infra/log";
import JwtParser from "$lib/server/infra/jwt";
import PostgresDriver from "$lib/server/infra/database/driver/postgres";

import AppointmentRepository from "$lib/server/core/appointment/repository";
import PacientRepository from "$lib/server/core/pacient/repository";
import UserRepository from "$lib/server/core/user/repository";
import MedicationRepository from "$lib/server/core/medication/repository";

export const config = new Config();

export const logger = new Logger(config.logLevel);
export const jwtParser = new JwtParser(config.jwtSecret, config.jwtExpiresIn, config.googleClientId);

export const postgresDriver = new PostgresDriver(logger, config.databaseUrl, config.databaseSchema);

export const userRepository = new UserRepository(logger, postgresDriver);
export const pacientRepository = new PacientRepository(logger, postgresDriver);
export const appointmentRepository = new AppointmentRepository(logger, postgresDriver);
export const medicationRepository = new MedicationRepository(logger, postgresDriver);