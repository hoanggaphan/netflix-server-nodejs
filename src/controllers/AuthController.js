import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import * as jwtHelper from '../helpers/jwtHelper.js';
import UserModel from '../models/UserModel.js';

const saltRounds = 10;

export const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password)
      return res
        .status(401)
        .json({ message: 'Tên tài khoản và mật khẩu không được bỏ trống' });

    const user = await UserModel.findUserByName(req.body.username);
    if (!user)
      return res.status(401).json({ message: 'Tài khoản không tồn tại' });

    const passCorrect = await bcrypt.compare(req.body.password, user.password);
    if (passCorrect) {
      const accessToken = await jwtHelper.generateToken(
        user,
        jwtHelper.accessTokenSecret,
        jwtHelper.accessTokenLife
      );

      const refreshToken = await jwtHelper.generateToken(
        user,
        jwtHelper.refreshTokenSecret,
        jwtHelper.refreshTokenLife
      );

      return res.json({
        ...user._doc,
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshTokenFromClient = req.body.refreshToken;

    if (refreshTokenFromClient) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
        const decoded = await jwtHelper.verifyToken(
          refreshTokenFromClient,
          jwtHelper.refreshTokenSecret
        );

        const accessToken = await jwtHelper.generateToken(
          decoded.data,
          jwtHelper.accessTokenSecret,
          jwtHelper.accessTokenLife
        );
        return res.status(200).json({ accessToken });
      } catch (error) {
        res.status(403).json({
          message: error.message,
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array({ onlyFirstError: true })
      .map((error) => error.msg);
    return res.status(400).json(errorMessages);
  }

  try {
    const user = await UserModel.findUserByName(req.body.username);
    if (user) return res.status(400).json(['Tên tài khoản đã tồn tại']);

    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const newUser = {
      username: req.body.username,
      roles: ['ROLE_USER'],
      password: hashedPassword,
    };
    const result = await UserModel.createNew(newUser);
    return res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
