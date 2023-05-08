import express from 'express';

const router = express.Router();

router.get("/","someController")
router.post("/","someController")
router.update("/","someController")
router.delete("/","someController")

export default router;