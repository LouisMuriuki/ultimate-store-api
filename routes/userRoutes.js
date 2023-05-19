import express from 'express';
import { deleteUser, getUsers, updateUser, userStats } from '../controllers/UserController.js';
import {verifyToken ,verifyTokenandAdmin,verifyTokenandAuthorization}from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/all",getUsers)

router.put("/update/:id",verifyTokenandAuthorization,updateUser)
router.delete("/delete/:id",verifyTokenandAdmin,deleteUser)

router.get("/stats",userStats)

export default router;