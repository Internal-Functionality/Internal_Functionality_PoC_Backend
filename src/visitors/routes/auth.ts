import { Router } from "express";
import { createOrResumeVisitor, getVisitorById } from "../controllers/visitor";

const router = Router();

router.post("/", createOrResumeVisitor);
router.get("/:id", getVisitorById);

export default router;
