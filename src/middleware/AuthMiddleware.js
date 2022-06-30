import * as jwtHelper from '../helpers/jwtHelper.js';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const checkToken = async (req, res, next) => {
  const tokenFromClient =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        jwtHelper.accessTokenSecret
      );

      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      return res.status(401).json({
        message: error.message,
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).json({
      message: 'No token provided.',
    });
  }
};
