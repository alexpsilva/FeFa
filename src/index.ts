import Config from './infra/config';
import Logger from './infra/log';
import JwtParser from './infra/jwt';

import JSXRenderer from './infra/render/jsx';

import PostgresDriver from './infra/database/driver/postgres';
import UserRepository from './core/user/repository';
import PacientRepository from './core/pacient/repository';
import AppointmentRepository from './core/appointment/repository';

import HTTPRouter from './infra/http/router';
import AuthMiddleware from './core/auth/middleware';
import AuthRouter from './core/auth/router';
import HomeRouter from './core/home/router';
import PacientRouter from './core/pacient/router';
import AppointmentRouter from './core/appointment/router';

//to-do: Add linting rule to prevent using console.log (should use the Logger class instead)

/* INFRA */
const config = new Config();
const logger = new Logger(config.logLevel);

const jwtParser = new JwtParser(config.jwtSecret, config.jwtExpiresIn, config.googleClientId);

const renderer = new JSXRenderer(logger);

const databaseDriver = new PostgresDriver(logger, config.databaseUrl, config.databaseSchema);

const userRepository = new UserRepository(logger, databaseDriver);
const pacientRepository = new PacientRepository(logger, databaseDriver);
const appointmentRepository = new AppointmentRepository(logger, databaseDriver);


/* ROUTERS */
const publicHttpRouter = new HTTPRouter(logger);
publicHttpRouter.addStaticFolder('/statics', config.staticFolder);
publicHttpRouter.addRouter(new AuthRouter(logger, renderer, jwtParser, userRepository));

const protectedHttpRouter = new HTTPRouter(logger);
publicHttpRouter.addRouter(protectedHttpRouter);
protectedHttpRouter.addMiddleware(new AuthMiddleware(logger, jwtParser));

protectedHttpRouter.addRouter(new HomeRouter(logger, renderer));

protectedHttpRouter.addRouter(new PacientRouter(logger, renderer, pacientRepository, appointmentRepository));
protectedHttpRouter.addRouter(new AppointmentRouter(logger, renderer, pacientRepository, appointmentRepository));


publicHttpRouter.listen(config.port, () => {
    logger.info(`Server is running at http://localhost:${config.port}`);
});
