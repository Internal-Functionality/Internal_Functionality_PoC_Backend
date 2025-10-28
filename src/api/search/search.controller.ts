import { Request, Response } from 'express';
import Search from './search.model';

export async function createSearch(req: Request, res: Response): Promise<void> {
  try {
    const search = await Search.create(req.body);
    res.status(201).json({
      success: true,
      data: search,
    });
  } catch (error) {
    console.log('Error creating search: ', error);
    res.status(500).json({
      success: false,
      error: 'Error creating search',
    });
  }
}

export async function readSearch(req: Request, res: Response): Promise<void> {
  try {
    const searches = await Search.find({});
    res.status(200).json({
      success: true,
      count: searches.length,
      data: searches,
    });
  } catch (error) {
    console.log('Error getting searches: ', error);
    res.status(500).json({
      success: false,
      error: 'Error getting searches',
    });
  }
}

export async function updateSearch(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const updatedSearch = await Search.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSearch) {
      res.status(404).json({
        success: false,
        message: 'Search not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedSearch,
    });
  } catch (error) {
    console.log('Error updating search: ', error);
    res.status(500).json({
      success: false,
      error: 'Error updating search',
    });
  }
}

export async function deleteSearch(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const deletedSearch = await Search.findByIdAndDelete(id);

    if (!deletedSearch) {
      res.status(404).json({
        success: false,
        message: 'Search not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Search deleted successfully',
      data: deletedSearch,
    });
  } catch (error) {
    console.log('Error deleting search: ', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting search.',
    });
  }
}
