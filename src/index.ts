import api from "api/";
import config from "config/config";
import logger from "config/logger";
import schema from "./encryptionSchema";
import {hashPassword, CryptoWorker} from "vendor/redux-e2e-encryption";
import app from "./app";

let server: ReturnType<typeof app.listen>;

const {email, password} = config;

(async () => {
    try {
        const hashedPassword = await hashPassword(password);
        const result = await api.authenticate({strategy: "local", email, password: hashedPassword});
        const {id, edek, kekSalt} = result.user;

        await CryptoWorker.initSchema(schema);
        await CryptoWorker.initKeys(edek, kekSalt, password, id);
    } catch (e) {
        console.error(e);
        throw e;
    }

    server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
})();

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");

    if (server) {
        server.close();
    }
});
