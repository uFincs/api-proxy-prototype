import express from "express";
import accountRoutes from "./accounts.route";
import transactionRoutes from "./transactions.route";

const router = express.Router();

router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);

export default router;
