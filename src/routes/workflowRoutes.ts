import express from "express"
import { authenticate } from "../middlewares/authMIddleware";
import { createworkflow, getwokflow } from "../controllers/workflowController";
const router = express.Router();

router.post("/",authenticate,createworkflow)
router.get("/", authenticate, getwokflow)

export default router;