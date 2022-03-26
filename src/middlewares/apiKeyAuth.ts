import {RequestHandler} from "express";
import httpStatus from "http-status";
import config from "config/config";

const apiKeyAuth = (): RequestHandler => (req, res, next) => {
    const apiKey = req.header("X-API-KEY");

    if (apiKey !== config.apiKey) {
        res.status(httpStatus.UNAUTHORIZED).send("UNAUTHORIZED");
    } else {
        next();
    }
};

export default apiKeyAuth;
