import Config from "@infra/config";

import Logger from "@infra/log";
import JwtParser from "@infra/jwt";
import PostgresDriver from "@infra/database/driver/postgres";

import AppointmentRepository from "@core/appointment/repository";
import PacientRepository from "@core/pacient/repository";
import UserRepository from "@core/user/repository";

export const config = new Config();

export const logger = new Logger(config.logLevel);
export const jwtParser = new JwtParser(config.jwtSecret, config.jwtExpiresIn, config.googleClientId);

export const postgresDriver = new PostgresDriver(logger, config.databaseUrl, config.databaseSchema);

export const userRepository = new UserRepository(logger, postgresDriver);
export const pacientRepository = new PacientRepository(logger, postgresDriver);
export const appointmentRepository = new AppointmentRepository(logger, postgresDriver);