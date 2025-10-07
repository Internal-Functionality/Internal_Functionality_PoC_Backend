import { Request, Response } from 'express';
import { User } from '../models/users.model';

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log('Error to create user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
}