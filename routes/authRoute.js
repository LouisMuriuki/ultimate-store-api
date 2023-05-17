import express from "express"
import registerUser from "../controllers/RegisterController.js"

const router =express.Router()

router.get("/",)
router.post("/newuser",registerUser)
router.put("/",)
router.delete("/",)

export default router