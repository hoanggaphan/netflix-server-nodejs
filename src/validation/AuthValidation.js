import { body } from 'express-validator';

export const register = [
  body(
    'username',
    'Tài khoản gới hạn từ 3-16 kí tự và không chứa kí tự đặc biệt.'
  )
    .isLength({ min: 3, max: 16 })
    .matches(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
    ),
  body(
    'password',
    'Mật khẩu có ít nhất 8 kí tự, gồm chữ hoa, chữ số và kí tự đặc biệt'
  )
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
    ),
  body('password_confirmation', 'Nhập lại mật khẩu chưa chính xác').custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
];
