import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: String,
  description: { type: String, default: '' },
  coverImg: { type: String, default: '' },
  bannerImg: { type: String, default: '' },
  trailerUrl: { type: String, default: '' },
  episodesCount: { type: Number, default: 0 },
  score: { type: Number, min: 0, max: 10, default: 0 },
  genres: { type: [String], default: [] },
  actors: { type: [String], default: [] },
  creators: { type: [String], default: [] },
  copyrightOfNetflix: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
});

MovieSchema.statics = {
  /**
   * Create new Movie
   * @param { object } item
   */
  createNew(item) {
    return this.create(item);
  },

  getAllMovies(keyword, limit = 10) {
    return this.find({ name: { $regex: keyword, $options: 'i' } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  },

  getMoviesRandom(limit = 10) {
    return this.find()
      .skip(Math.floor(Math.random() * 10))
      .limit(limit)
      .exec();
  },

  getPopularInNetflix(limit = 10) {
    return this.find({ score: { $gt: 5 }, copyrightOfNetflix: true })
      .limit(limit)
      .exec();
  },

  getGoodMovie(limit = 10) {
    return this.find({ score: { $gt: 5 } })
      .limit(limit)
      .exec();
  },

  getNewUpdatedMovie(limit) {
    return this.find().sort({ createdAt: -1 }).limit(limit).exec();
  },

  /**
   * Find movie by name
   * @param { string: name of movie } name
   */
  findMovieByName(name) {
    return this.findOne({
      name: { $regex: '^' + name + '$', $options: 'i' },
    }).exec();
  },
};

export default mongoose.model('movie', MovieSchema);
