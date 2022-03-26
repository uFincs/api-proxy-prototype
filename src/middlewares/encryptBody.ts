import {RequestHandler} from "express";
import {CryptoWorker} from "vendor/redux-e2e-encryption";

const encryptBody =
    (payloadFormat): RequestHandler =>
    async (req, res, next) => {
        const encryptedBody = await CryptoWorker.encrypt(req.body, payloadFormat);
        req.body = encryptedBody;

        next();
    };

export default encryptBody;
