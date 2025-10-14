import { Router } from "express";
import { createOrResumeVisitor, getVisitorById } from "../controllers/visitor";

const router = Router();

router.post("/visitor/", createOrResumeVisitor);
router.get("/visitor/:id", getVisitorById);

export default router;
