import { body } from 'express-validator';

export const updateUser = [
  body('fullName', 'Tên đầy đủ tối đa 50 kí tự và không chứa kí tự đặc biệt.')
    .optional()
    .isLength({ max: 50 })
    .matches(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
    ),
  body('email', 'Email phải có dạng example@gmail.com').optional().isEmail(),
  body('phone', 'Số điện thoại bắt đầu từ 0, gồm 9-10 số.')
    .optional()
    .matches(/^(0)[0-9]{9,10}$/),
  body('avatar').optional(),
];

export const changePassword = [
  body(
    'newPass',
    'Mật khẩu có ít nhất 8 kí tự, gồm chữ hoa, chữ số và kí tự đặc biệt'
  )
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
    ),
];
