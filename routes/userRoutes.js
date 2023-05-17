import express from 'express';
import { getUsers } from '../controllers/UserController.js';

const router = express.Router();

router.get("/user",getUsers)
// router.post("/","someController")
// router.update("/","someController")
// router.delete("/","someController")

export default router;