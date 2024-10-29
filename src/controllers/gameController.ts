import { Request, Response } from 'express';
import Game from '../models/Game';

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error creating game', error });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: 'Error updating game', error });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
};