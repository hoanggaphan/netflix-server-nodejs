import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  name: String,
  movieId: { type: String, default: '' },
  img: { type: String, default: '' },
  subName: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  videoUrl: { type: String, default: '' },
});

EpisodeSchema.statics = {
  /**
   * Create new Episode
   * @param { object } item
   */
  createNew(item) {
    return this.create(item);
  },

  findEpisodesByMovieId(movieId) {
    return this.find({ movieId }).exec();
  },

  /**
   * Find episode by name
   * @param { string: name of episode } name
   */
  findEpisodeByName(name) {
    return this.findOne({
      name: { $regex: '^' + name + '$', $options: 'i' },
    }).exec();
  },
};

export default mongoose.model('episode', EpisodeSchema);
