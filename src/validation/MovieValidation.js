import { body } from 'express-validator';
import MovieModel from '../models/MovieModel.js';

export const createAndUpdateMovie = [
  body('name', 'Tên phim tối đa 100 kí tự.')
    .custom(async (name) => {
      const movie = await MovieModel.findMovieByName(name);
      if (movie) return Promise.reject('tên phim đã tồn tại');
    })
    .isLength({ max: 100 }),
];
