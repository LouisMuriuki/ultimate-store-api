import express from "express"
import { createCart, deleteCart, getAllCarts, getUserCart, updateCart } from "../controllers/cartController.js"
import { verifyToken, verifyTokenandAdmin, verifyTokenandAuthorization } from "../middleware/verifyToken.js"

const router =express.Router()


router.post("/createCart",verifyToken,createCart)
router.get("/getUserCart",verifyTokenandAuthorization,getUserCart)
router.get("/getAllCarts",verifyTokenandAdmin,getAllCarts)
router.put("/update/:id",verifyTokenandAdmin,updateCart)
router.delete("/delete/:id",verifyTokenandAdmin,deleteCart)

export default router