import express from "express"
import {registerUser,loginUser} from "../controllers/authController.js"

const router =express.Router()

router.get("/login",loginUser)
router.post("/register",registerUser)
router.put("/",)
router.delete("/",)

export default router