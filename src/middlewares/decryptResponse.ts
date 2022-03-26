import logger from "config/logger";
import {RequestHandler} from "express";
import {CryptoWorker} from "vendor/redux-e2e-encryption";

const decryptResponse =
    (payloadFormat): RequestHandler =>
    async (req, res, next) => {
        const oldSend = res.send;

        res.send = (data) => {
            // Doing it like this prevents a double send: https://stackoverflow.com/a/60817116.
            res.send = oldSend;

            CryptoWorker.decrypt(data, payloadFormat)
                .then((decryptedData) => {
                    res.send(decryptedData);
                })
                .catch((err) => {
                    logger.error(err);
                });

            // This is literally just to appease the return type of res.send.
            return res;
        };

        next();
    };

export default decryptResponse;
