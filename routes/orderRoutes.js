import express from "express"
import { verifyToken, verifyTokenandAdmin, verifyTokenandAuthorization } from "../middleware/verifyToken.js"
import { createOrder, deleteOrder, getAllOrders, getUserOrder, updateOrder } from "../controllers/orderControllers.js"

const router =express.Router()

router.get("/userOrder",verifyTokenandAuthorization,getUserOrder)
router.get("/allOrders",verifyTokenandAuthorization,getAllOrders)
router.post("/create",verifyTokenandAuthorization,createOrder)
router.put("/update/:id",verifyTokenandAdmin,updateOrder)
router.delete("/delete/:id",verifyTokenandAdmin,deleteOrder)

export default router