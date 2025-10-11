/*
import express, { Request, Response } from "express";
import { Activity } from "../models/activity";

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
*/

import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

// Definimos el esquema para las actividades (solo si no lo tienes)
const activitySchema = new mongoose.Schema({
  userId: String,
  role: String,
  type: String,
  metadata: Object,
  timestamp: String,
});

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

// Registrar una nueva actividad
router.post("/", async (req, res) => {
  try {
    const { userId, role, type, metadata, timestamp } = req.body;

    if (!userId || !role || !type || !timestamp) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const activity = new Activity({ userId, role, type, metadata, timestamp });
    await activity.save();

    res.status(201).json({ message: "Actividad registrada con éxito", activity });
  } catch (error) {
    console.error("Error al registrar actividad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Obtener todas las actividades
router.get("/", async (_req, res) => {
  const activities = await Activity.find().sort({ timestamp: -1 });
  res.json(activities);
});

export { router as activityRouter };
