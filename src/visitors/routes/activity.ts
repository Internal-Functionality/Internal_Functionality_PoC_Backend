import express, { Request, Response } from "express";
import { Activity } from "../models/activity.js";

export const activityRouter = express.Router();

activityRouter.post("/log", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role, type, metadata } = req.body;

    if (!userId || !role || !type) {
      res.status(400).json({ error: "Faltan campos requeridos" });
      return;
    }

    await Activity.create({
      userId,
      role,
      type,
      metadata: metadata || {},
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error al registrar actividad:", error);
    res.status(500).json({ error: "Error interno" });
  }
});
