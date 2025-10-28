import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Activity } from './activities.model';

function getAdjustedDate(date?: Date): Date {
  const now = date || new Date();
  const offset = -4;
  return new Date(now.getTime() + offset * 60 * 60 * 1000);
}

export async function createActivityController(req: Request, res: Response) {
  try {
    const { userId, type, metadata } = req.body;

    if (type === 'click' && metadata?.jobTitle) {
      const userIdObj = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

      const searchQuery = {
        userId: userIdObj,
        type: 'click',
        'metadata.jobTitle': metadata.jobTitle,
      };

      const existingClick = await Activity.findOne(searchQuery);

      if (existingClick) {
        const currentClickCount = existingClick.metadata?.clickCount || 0;
        const newClickCount = currentClickCount + 1;
        const newTimestamp = getAdjustedDate();
        const newDate = req.body.date
          ? getAdjustedDate(new Date(req.body.date))
          : getAdjustedDate();

        const updatedActivity = await Activity.findByIdAndUpdate(
          existingClick._id,
          {
            $set: {
              timestamp: newTimestamp,
              date: newDate,
              metadata: {
                ...existingClick.metadata,
                ...metadata,
                clickCount: newClickCount,
              },
            },
          },
          { new: true },
        );

        return res.status(200).json({
          message: 'Click count updated',
          activity: updatedActivity,
          isUpdate: true,
        });
      }

      const flexibleQuery = {
        userId: userIdObj,
        type: 'click',
        'metadata.jobTitle': { $regex: new RegExp(`^${metadata.jobTitle}$`, 'i') },
      };

      const flexibleResult = await Activity.findOne(flexibleQuery);

      if (flexibleResult) {
        const currentClickCount = flexibleResult.metadata?.clickCount || 0;
        const newClickCount = currentClickCount + 1;
        const newTimestamp = getAdjustedDate();
        const newDate = req.body.date
          ? getAdjustedDate(new Date(req.body.date))
          : getAdjustedDate();

        const updatedActivity = await Activity.findByIdAndUpdate(
          flexibleResult._id,
          {
            $set: {
              timestamp: newTimestamp,
              date: newDate,
              metadata: {
                ...flexibleResult.metadata,
                ...metadata,
                clickCount: newClickCount,
              },
            },
          },
          { new: true },
        );

        return res.status(200).json({
          message: 'Click count updated',
          activity: updatedActivity,
          isUpdate: true,
        });
      }
    }

    const activityData = {
      ...req.body,
      timestamp: getAdjustedDate(),
      date: req.body.date ? getAdjustedDate(new Date(req.body.date)) : getAdjustedDate(),
      metadata: {
        ...metadata,
        clickCount: type === 'click' && metadata?.jobTitle ? 1 : metadata?.clickCount || 0,
      },
    };

    const activity = await Activity.create(activityData);

    res.status(200).json({
      message: 'Activity created',
      activity: activity,
      isUpdate: false,
    });
  } catch (error) {
    console.log('Error creating Activity:', error);
    res.status(500).json({ error: 'Error creating Activity' });
  }
}

export async function getActivities(req: Request, res: Response) {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    console.log('Error getting Activities:', error);
    res.status(500).json({ error: 'Error getting Activities' });
  }
}

export async function getActivity(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.status(200).json(activity);
  } catch (error) {
    console.log('Error getting Activity:', error);
    res.status(500).json({ error: 'Error getting Activity' });
  }
}

export async function updateActivity(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      timestamp: getAdjustedDate(),
    };

    const activity = await Activity.findByIdAndUpdate(id, updateData, { new: true });
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.log('Error updating Activity:', error);
    res.status(500).json({ error: 'Error updating Activity' });
  }
}

export async function deleteActivity(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted' });
  } catch (error) {
    console.log('Error deleting Activity:', error);
    res.status(500).json({ error: 'Error deleting Activity' });
  }
}

export async function getClickStats(req: Request, res: Response) {
  try {
    const { jobTitle } = req.query;

    let query: any = { type: 'click' };
    if (jobTitle) {
      query['metadata.jobTitle'] = jobTitle;
    }

    const clickStats = await Activity.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$metadata.jobTitle',
          totalClicks: { $sum: '$metadata.clickCount' },
          uniqueUsers: { $addToSet: '$userId' },
          lastClick: { $max: '$timestamp' },
        },
      },
      {
        $project: {
          jobTitle: '$_id',
          totalClicks: 1,
          uniqueUsersCount: { $size: '$uniqueUsers' },
          lastClick: 1,
          _id: 0,
        },
      },
      { $sort: { totalClicks: -1 } },
    ]);

    res.status(200).json(clickStats);
  } catch (error) {
    console.log('Error getting click stats:', error);
    res.status(500).json({ error: 'Error getting click stats' });
  }
}

export async function debugClicks(req: Request, res: Response) {
  try {
    const allClicks = await Activity.find({ type: 'click' }).sort({ timestamp: -1 });
    res.status(200).json({
      message: 'Debug info',
      totalClicks: allClicks.length,
      clicks: allClicks,
    });
  } catch (error) {
    console.log('Error in debugClicks:', error);
    res.status(500).json({ error: 'Error getting debug info' });
  }
}
