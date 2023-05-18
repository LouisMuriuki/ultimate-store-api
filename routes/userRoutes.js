import express from 'express';
import { getUsers, updateUser } from '../controllers/UserController.js';
import {verifyToken ,verifyTokenandAuthorization}from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/user",getUsers)
// router.post("/","someController")
router.put("/update/:id",verifyTokenandAuthorization,updateUser)
// router.delete("/","someController")

export default router;