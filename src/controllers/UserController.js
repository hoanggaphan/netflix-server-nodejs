import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import EpisodeModel from '../models/EpisodeModel';
import UserModel from '../models/UserModel';

const saltRounds = 10;

export const getAllUsers = async (req, res) => {
  try {
    const result = await UserModel.find();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.id).exec();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getLikeList = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();
    const result = await EpisodeModel.find({
      _id: { $in: user.likeList },
    }).exec();

    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const result = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await UserModel.findByIdAndDelete({
      _id: req.params.id,
    }).exec();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const likeEpisode = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId).exec();
    if (!user)
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });

    const episode = await EpisodeModel.findById(req.body.episodeId).exec();
    if (!episode)
      return res.status(401).json({ message: 'Không tìm thấy tập phim' });

    const index = user.likeList.indexOf(req.body.episodeId);
    let newLikeList = [...user.likeList];
    if (index !== -1) {
      // Nếu đã like thì xóa khỏi list
      newLikeList.splice(index, 1);
    } else {
      // Nếu chưa like thì thêm vào list
      newLikeList.push(req.body.episodeId);
    }
    user.likeList = newLikeList;
    const result = await user.save();
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);

    return res.status(400).json(errorMessages);
  }

  try {
    const userId = req.body.userId;
    const user = await UserModel.findById(userId).exec();
    if (!user)
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });

    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;

    const passCorrect = await bcrypt.compare(oldPass, user.password);
    if (passCorrect) {
      const hashedNewPassword = bcrypt.hashSync(newPass, saltRounds);
      user.password = hashedNewPassword;
      const result = await user.save();
      return res.json(result);
    } else {
      return res.status(401).json({ message: 'Mật khẩu cũ không đúng' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
