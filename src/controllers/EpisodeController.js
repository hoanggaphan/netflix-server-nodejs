import EpisodeModel from '../models/EpisodeModel';
import { validationResult } from 'express-validator';

export const createEpisode = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const result = await EpisodeModel.createNew(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllEpisodes = async (req, res) => {
  try {
    const result = await EpisodeModel.find();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getEpisode = async (req, res) => {
  try {
    const episode = await EpisodeModel.findById(req.params.id).exec();
    const episodes = await EpisodeModel.findEpisodesByMovieId(episode.movieId);
    const result = { ...episode._doc, episodes };
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateEpisode = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const result = await EpisodeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).exec();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteEpisode = async (req, res) => {
  try {
    const result = await EpisodeModel.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
