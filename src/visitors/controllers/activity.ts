import { Request, Response } from "express";
import { Activity } from "../../act-requesters-hu6/models/activities.model";

 export async function LogActivity(req: Request, res: Response) {
  try {
    const { userId, role, type, metadata, timestamp } = req.body;

    if (!userId || !role || !type) {
      return res.status(400).json({ message: "Datos incompletos: userId, role y type son requeridos" });
    }

    const activity = new Activity({ 
      userId, 
      date: timestamp ? new Date(timestamp) : new Date(),
      role, 
      type, 
      metadata: metadata || {},
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });

    await activity.save();

    res.status(201).json({ 
      message: "Actividad registrada con éxito", 
      activity: {
        id: activity._id,
        userId: activity.userId,
        type: activity.type,
        timestamp: activity.timestamp
      }
    });
  } catch (error) {
    console.error("Error al registrar actividad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export async function getActivities(req: Request, res: Response){
  try {
    const activities = await Activity.find().sort({ timestamp: -1 });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};