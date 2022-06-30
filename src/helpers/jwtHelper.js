import jwt from 'jsonwebtoken';

export const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1d';
export const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ||
  'access-token-secret-hoang-love-hiep-3k-@123()!!!';
export const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '7d';
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET ||
  'refresh-token-secret-hoang-love-hiep-3k-@123()!!!';

/**
 * private function generateToken
 * @param {object} user
 * @param {string} secretSignature
 * @param {string} tokenLife
 */
export const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    const userData = {
      _id: user._id,
      username: user.username,
      roles: user.roles,
    };

    // Thực hiện ký và tạo token
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
