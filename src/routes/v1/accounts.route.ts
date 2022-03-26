import express from "express";
import decryptResponse from "middlewares/decryptResponse";
import encryptBody from "middlewares/encryptBody";
import accountsController from "controllers/accounts.controller";
import {EncryptionSchema} from "vendor/redux-e2e-encryption";

const router = express.Router();

router
    .route("/")
    .post(encryptBody(EncryptionSchema.single("account")), accountsController.createAccount)
    .get(decryptResponse(EncryptionSchema.arrayOf("account")), accountsController.getAccounts);

router
    .route("/:id")
    .get(decryptResponse(EncryptionSchema.single("account")), accountsController.getAccount)
    .put(encryptBody(EncryptionSchema.single("account")), accountsController.updateAccount)
    .delete(accountsController.deleteAccount);

export default router;
