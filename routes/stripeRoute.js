import express from "express"
import { verifyToken } from "../middleware/verifyToken"
import makePayments from "../controllers/stripecontroller"

const router=express.Router()


router.post("/payments",verifyToken,makePayments)

export default router