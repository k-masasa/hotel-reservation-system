import Joi from 'joi';

export const createReservationSchema = Joi.object({
  adultCount: Joi.number().integer().min(1).required().messages({
    'number.base': '大人人数は数値で入力してください',
    'number.integer': '大人人数は整数で入力してください',
    'number.min': '大人は1名以上必要です',
    'any.required': '大人人数は必須です'
  }),
  
  schoolChildCount: Joi.number().integer().min(0).required().messages({
    'number.base': '就学児人数は数値で入力してください',
    'number.integer': '就学児人数は整数で入力してください',
    'number.min': '0以上の数値を入力してください',
    'any.required': '就学児人数は必須です'
  }),
  
  preschoolChildCount: Joi.number().integer().min(0).required().messages({
    'number.base': '未就学児人数は数値で入力してください',
    'number.integer': '未就学児人数は整数で入力してください',
    'number.min': '0以上の数値を入力してください',
    'any.required': '未就学児人数は必須です'
  }),
  
  guestName: Joi.string().max(100).required().messages({
    'string.base': 'お名前は文字列で入力してください',
    'string.max': '100文字以内で入力してください',
    'any.required': 'お名前は必須です'
  }),
  
  phoneNumber: Joi.string().pattern(/^[0-9-]+$/).required().messages({
    'string.base': '電話番号は文字列で入力してください',
    'string.pattern.base': '電話番号の形式が正しくありません',
    'any.required': '電話番号は必須です'
  }),
  
  email: Joi.string().email().required().messages({
    'string.base': 'メールアドレスは文字列で入力してください',
    'string.email': 'メールアドレスの形式が正しくありません',
    'any.required': 'メールアドレスは必須です'
  }),
  
  address: Joi.string().max(500).optional().messages({
    'string.base': '住所は文字列で入力してください',
    'string.max': '500文字以内で入力してください'
  }),
  
  birthYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional().messages({
    'number.base': '生年は数値で入力してください',
    'number.integer': '生年は整数で入力してください',
    'number.min': '1900年以降の年を入力してください',
    'number.max': '現在年以前の年を入力してください'
  }),
  
  birthMonth: Joi.number().integer().min(1).max(12).optional().messages({
    'number.base': '生月は数値で入力してください',
    'number.integer': '生月は整数で入力してください',
    'number.min': '1以上12以下の値を入力してください',
    'number.max': '1以上12以下の値を入力してください'
  }),
  
  birthDay: Joi.number().integer().min(1).max(31).optional().messages({
    'number.base': '生日は数値で入力してください',
    'number.integer': '生日は整数で入力してください',
    'number.min': '1以上31以下の値を入力してください',
    'number.max': '1以上31以下の値を入力してください'
  }),
  
  checkInYear: Joi.number().integer().min(new Date().getFullYear()).required().messages({
    'number.base': 'チェックイン年は数値で入力してください',
    'number.integer': 'チェックイン年は整数で入力してください',
    'number.min': '現在年以降の年を入力してください',
    'any.required': 'チェックイン年は必須です'
  }),
  
  checkInMonth: Joi.number().integer().min(1).max(12).required().messages({
    'number.base': 'チェックイン月は数値で入力してください',
    'number.integer': 'チェックイン月は整数で入力してください',
    'number.min': '1以上12以下の値を入力してください',
    'number.max': '1以上12以下の値を入力してください',
    'any.required': 'チェックイン月は必須です'
  }),
  
  checkInDay: Joi.number().integer().min(1).max(31).required().messages({
    'number.base': 'チェックイン日は数値で入力してください',
    'number.integer': 'チェックイン日は整数で入力してください',
    'number.min': '1以上31以下の値を入力してください',
    'number.max': '1以上31以下の値を入力してください',
    'any.required': 'チェックイン日は必須です'
  }),
  
  checkOutYear: Joi.number().integer().min(new Date().getFullYear()).required().messages({
    'number.base': 'チェックアウト年は数値で入力してください',
    'number.integer': 'チェックアウト年は整数で入力してください',
    'number.min': '現在年以降の年を入力してください',
    'any.required': 'チェックアウト年は必須です'
  }),
  
  checkOutMonth: Joi.number().integer().min(1).max(12).required().messages({
    'number.base': 'チェックアウト月は数値で入力してください',
    'number.integer': 'チェックアウト月は整数で入力してください',
    'number.min': '1以上12以下の値を入力してください',
    'number.max': '1以上12以下の値を入力してください',
    'any.required': 'チェックアウト月は必須です'
  }),
  
  checkOutDay: Joi.number().integer().min(1).max(31).required().messages({
    'number.base': 'チェックアウト日は数値で入力してください',
    'number.integer': 'チェックアウト日は整数で入力してください',
    'number.min': '1以上31以下の値を入力してください',
    'number.max': '1以上31以下の値を入力してください',
    'any.required': 'チェックアウト日は必須です'
  }),
  
  roomType: Joi.string().valid('スタンダード', 'デラックス', 'スイート').optional().messages({
    'string.base': '部屋タイプは文字列で入力してください',
    'any.only': 'スタンダード、デラックス、スイートのいずれかを選択してください'
  }),
  
  roomId: Joi.number().integer().positive().optional().messages({
    'number.base': '部屋IDは数値で入力してください',
    'number.integer': '部屋IDは整数で入力してください',
    'number.positive': '部屋IDは正の数値で入力してください'
  }),
  
  totalPrice: Joi.number().min(0).required().messages({
    'number.base': '宿泊料金は数値で入力してください',
    'number.min': '宿泊料金は0以上で入力してください',
    'any.required': '宿泊料金は必須です'
  })
});