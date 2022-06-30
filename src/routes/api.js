import express from 'express';
import * as AuthController from '../controllers/AuthController.js';
import * as EpisodeController from '../controllers/EpisodeController.js';
import * as MovieController from '../controllers/MovieController.js';
import * as UserController from '../controllers/UserController.js';
import * as AuthMiddleware from '../middleware/AuthMiddleware.js';
import * as AuthValidation from '../validation/AuthValidation.js';
import * as EpisodeValidation from '../validation/EpisodeValidation.js';
import * as MovieValidation from '../validation/MovieValidation.js';
import * as UserValidation from '../validation/UserValidation.hs';

const router = express.Router();

/**
 * Init all routes
 * @params app from exactly express
 */
const initRoutes = (app) => {
  router.post(
    '/movies',
    MovieValidation.createAndUpdateMovie,
    MovieController.createMovie
  );
  router.get('/movies', MovieController.getAllMovies);
  router.get('/movies/random', MovieController.getRandomMovies);
  router.get(
    '/movies/popular-in-netflix',
    MovieController.getMoviesPopularInNetFlix
  );
  router.get('/movies/good', MovieController.getGoodMovies);
  router.get('/movies/new-updated', MovieController.getNewUpdatedMovies);
  router.get('/movies/:id', MovieController.getMovie);
  // router.put(
  //   '/movies/:id',
  //   MovieValidation.createAndUpdateMovie,
  //   MovieController.updateMovie
  // );
  // router.delete('/movies/:id', MovieController.deleteMovie);

  router.post(
    '/episodes',
    EpisodeValidation.createAndUpdateEpisode,
    EpisodeController.createEpisode
  );
  router.get('/episodes', EpisodeController.getAllEpisodes);
  router.get('/episodes/:id', EpisodeController.getEpisode);
  // router.put(
  //   '/episodes/:id',
  //   EpisodeValidation.createAndUpdateEpisode,
  //   EpisodeController.updateEpisode
  // );
  // router.delete('/episodes/:id', EpisodeController.deleteEpisode);

  router.get('/users/', AuthMiddleware.checkToken, UserController.getAllUsers);
  router.get('/users/:id', AuthMiddleware.checkToken, UserController.getUser);
  router.put(
    '/users/:id',
    AuthMiddleware.checkToken,
    UserValidation.updateUser,
    UserController.updateUser
  );
  router.post(
    '/users/like-episode',
    AuthMiddleware.checkToken,
    UserController.likeEpisode
  );
  router.post(
    '/users/change-password',
    AuthMiddleware.checkToken,
    UserValidation.changePassword,
    UserController.changePassword
  );
  router.get(
    '/users/like-list/:id',
    AuthMiddleware.checkToken,
    UserController.getLikeList
  );

  // router.delete('/users/:id', UserController.deleteUser);

  router.post('/register', AuthValidation.register, AuthController.register);
  router.post('/login', AuthController.login);
  router.post('/refresh-token', AuthController.refreshToken);

  return app.use('/api/v1', router);
};

export default initRoutes;
