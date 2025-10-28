import { Request, Response } from 'express';
import { User } from './users.model';

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log('Error to create user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log('Error to get users:', error);
    res.status(500).json({ error: 'Error getting users' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log('Error to get user:', error);
    res.status(500).json({ error: 'Error getting user' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log('Error to update user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.log('Error to delete user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
}
