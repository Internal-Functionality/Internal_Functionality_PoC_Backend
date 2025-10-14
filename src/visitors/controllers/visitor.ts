import { Request, Response } from "express";
import { User } from "../../act-requesters-hu6/models/users.model";
import { Activity } from "../../act-requesters-hu6/models/activities.model";

export async function createOrResumeVisitor (req: Request, res: Response): Promise<void> {
  try {
    const { visitorId, language } = req.body;

    if (visitorId) {
      const existing = await User.findById(visitorId);
      if (existing && existing.role === "visitor") {
        await Activity.create({
          userId: existing._id,
          role: "visitor",
          type: "session_start",
          metadata: { resumed: true },
        });

        res.status(200).json({
          userId: existing._id,
          role: existing.role,
          name: existing.name,
        });
        return;
      }
    }

    const uniqueEmail = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}@temp.com`;

    const visitor = await User.create({
      name: `Visitor_${Date.now()}`,
      passwordHash: '000000',
      email: uniqueEmail,
      role: "visitor",
      language: language || "es",
    });

    await Activity.create({
      userId: visitor._id,
      role: "visitor",
      type: "session_start",
      metadata: { resumed: false },
    });

    res.status(201).json({
      userId: visitor._id,
      role: visitor.role,
      name: visitor.name,
    });
  } catch (error) {
    console.error("Error en /visitor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export async function getVisitorById (req: Request, res: Response): Promise<void> {
  try {
    const visitor = await User.findById(req.params.id);
    if (!visitor || visitor.role !== "visitor") {
      res.status(404).json({ error: "No encontrado" });
      return;
    }
    res.status(200).json(visitor);
  } catch (error) {
    console.error("Error en /visitor/id:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
