import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  fullName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  roles: { type: [String], default: ['ROLE_USER'] },
  likeList: { type: [String], default: [] },
});

UserSchema.statics = {
  /**
   * Create new Movie
   * @param { object } item
   */
  createNew(item) {
    return this.create(item);
  },

  /**
   * Find user by name
   * @param { string: name of user } username
   */
  findUserByName(username) {
    return this.findOne({
      username: { $regex: '^' + username + '$', $options: 'i' },
    }).exec();
  },
};

export default mongoose.model('user', UserSchema);
