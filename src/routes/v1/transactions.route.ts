import express from "express";
import decryptResponse from "middlewares/decryptResponse";
import encryptBody from "middlewares/encryptBody";
import transactionsController from "controllers/transactions.controller";
import {EncryptionSchema} from "vendor/redux-e2e-encryption";

const router = express.Router();

router
    .route("/")
    .post(
        encryptBody(EncryptionSchema.single("transaction")),
        transactionsController.createTransaction
    )
    .get(
        decryptResponse(EncryptionSchema.arrayOf("transaction")),
        transactionsController.getTransactions
    );

router
    .route("/:id")
    .get(
        decryptResponse(EncryptionSchema.single("transaction")),
        transactionsController.getTransaction
    )
    .put(
        encryptBody(EncryptionSchema.single("transaction")),
        transactionsController.updateTransaction
    )
    .delete(transactionsController.deleteTransaction);

router
    .route("/bulk")
    .post(
        encryptBody(EncryptionSchema.arrayOf("transaction")),
        transactionsController.createTransactions
    );

export default router;
