import { Request, Response } from 'express';
import { Activity } from '../models/activities.model';

// Función para obtener fecha ajustada a zona horaria
function getAdjustedDate(date?: Date): Date {
  const now = date || new Date();
  const offset = -4; // Bolivia UTC-4
  return new Date(now.getTime() + offset * 60 * 60 * 1000);
}

export async function createActivityController(req: Request, res: Response) {
  try {
    const activityData = {
      ...req.body,
      timestamp: getAdjustedDate(),
      date: req.body.date ? getAdjustedDate(new Date(req.body.date)) : getAdjustedDate()
    };
    
    const activity = await Activity.create(activityData);
    res.status(200).json(activity);
  } catch (error) {
    console.log('Error to create Activity:', error);
    res.status(500).json({ error: 'Error creating Activity' });
  }
}

export async function getActivities(req: Request, res: Response){
    try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    console.log('Error to get Activities:', error);
    res.status(500).json({ error: 'Error getting Activities' });
  }
}

export async function getActivity(req: Request, res: Response){
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.status(200).json(activity);
  } catch (error) {
    console.log('Error to get Activity:', error);
    res.status(500).json({ error: 'Error getting Activity' });
  }
}

export async function updateActivity(req: Request, res: Response){
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      timestamp: getAdjustedDate()
    };
    
    const activity = await Activity.findByIdAndUpdate(id, updateData);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const updatedActivity = await Activity.findById(id);
    res.status(200).json(updatedActivity);
  } catch (error) {
    console.log('Error to update Activity:', error);
    res.status(500).json({ error: 'Error updating Activity' });
  }
}

export async function deleteActivity(req: Request, res: Response){
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    console.log('Error to delete Activity:', error);
    res.status(500).json({ error: 'Error deleting Activity' });
  }
}