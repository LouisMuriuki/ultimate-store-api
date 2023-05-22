import express from "express"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/productControllers.js"
import { verifyTokenandAdmin } from "../middleware/verifyToken.js"
const router=express.Router()

router.get("/allproducts",getAllProducts)
router.post("/add",verifyTokenandAdmin,createProduct)
router.put("/update/:id",verifyTokenandAdmin,updateProduct)
router.delete("/delete/:id",verifyTokenandAdmin,deleteProduct)

export default router