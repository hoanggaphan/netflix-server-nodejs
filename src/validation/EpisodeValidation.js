import { body } from 'express-validator';
import EpisodeModel from '../models/EpisodeModel';

export const createAndUpdateEpisode = [
  body('name', 'Tên tập phim tối đa 100 kí tự.')
    .custom(async (name) => {
      const episode = await EpisodeModel.findEpisodeByName(name);
      if (episode) return Promise.reject('tên tập phim đã tồn tại');
    })
    .isLength({ max: 100 }),
];
