import express from 'express';
import { deleteUser, getUsers, updateUser, userStats } from '../controllers/UserController.js';
import {verifyTokenandAdmin,verifyTokenandAuthorization}from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/all",verifyTokenandAdmin,getUsers)
router.put("/update/:id",verifyTokenandAuthorization,updateUser)
router.delete("/delete/:id",verifyTokenandAdmin,deleteUser)
router.get("/stats",verifyTokenandAdmin,userStats)

export default router;