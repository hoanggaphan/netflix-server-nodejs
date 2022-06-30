import { validationResult } from 'express-validator';
import EpisodeModel from '../models/EpisodeModel';
import MovieModel from '../models/MovieModel';

export const createMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const result = await MovieModel.createNew(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllMovies = async (req, res) => {
  const limit = req.query.limit || 10;
  const keyword = req.query.keyword || '';

  try {
    const result = await MovieModel.getAllMovies(keyword, limit);
    if (result.length === 0)
      return res.status(401).json({ message: 'Không tìm thấy phim' });
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRandomMovies = async (req, res) => {
  const limit = req.query.limit || 10;

  try {
    const result = await MovieModel.getMoviesRandom(limit);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMoviesPopularInNetFlix = async (req, res) => {
  const limit = req.query.limit || 10;

  try {
    const result = await MovieModel.getPopularInNetflix(limit);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getGoodMovies = async (req, res) => {
  const limit = req.query.limit || 10;

  try {
    const result = await MovieModel.getGoodMovie(limit);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getNewUpdatedMovies = async (req, res) => {
  const limit = req.query.limit || 10;

  try {
    const result = await MovieModel.getNewUpdatedMovie(limit);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMovie = async (req, res) => {
  try {
    const episodes = await EpisodeModel.findEpisodesByMovieId(req.params.id);
    const movie = await MovieModel.findById(req.params.id).exec();
    const result = { ...movie._doc, episodes };
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const result = await MovieModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const result = await MovieModel.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
