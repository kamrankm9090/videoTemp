import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().required('Required').trim(),
  password: yup.string().required('Required').trim(),
});

const registerSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  userName: yup
    .string()
    .matches(/^(?![_.,])[a-zA-Z0-9_.,]+$/, 'Please enter a valid username')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .nullable()
    .trim()
    .required('Required'),
  password: yup
    .string()
    // .min(8, t('auth.minPassword1'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .max(36, 'Must be 36 characters or less')
    .required('Required')
    .trim(),
  confirm: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .trim(),
});

const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    // .min(8, t('auth.minPassword1'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .max(36, 'Must be 36 characters or less')
    .required('Required')
    .trim(),
  confirm: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .trim(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Required').trim(),
});

const reportReasonSchema = yup.object().shape({
  reason: yup.string().required('Required').trim(),
});

const selectCategorySchema = yup.object().shape({
  categories: yup.array().required('Required').nullable(),
});

const verificationSchema = yup.object().shape({
  verificationCode: yup
    .number()
    .typeError('Code must be a number')
    .required('Required')
    .integer('Code must be an integer')
    .nullable(),
});

const UserSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required')
    .lowercase()
    .trim(),

  fullName: yup
    .string()
    .min(1, 'Full Name is required')
    .max(100, 'Full Name is too long')
    .required('Full Name is required')
    .trim(),

  imageProfile: yup.string().nullable(),

  nickName: yup.string().max(50, 'Nickname cannot exceed 50 characters').trim(),

  phoneNumber: yup
    .string()
    .matches(
      /^[\+]?[1-9][0-9]{7,14}$/,
      'Phone number is not valid (should be a valid international phone number)',
    )
    .required('Phone Number is required')
    .trim(),

  birthdate: yup
    .date()
    .required('Birthdate is required')
    .max(new Date(), 'Birthdate cannot be in the future'),

  gender: yup
    .string()
    .oneOf(
      ['male', 'female', 'non-binary', 'other', 'prefer not to say'],
      'Invalid gender',
    )
    .required('Gender is required'),
});

const createContentSchema = yup.object({
  title: yup.string().required('required').trim(),
  isFree: yup.boolean().nullable(),
  isSchedule: yup.boolean().nullable(),
  description: yup.string().required('required').trim(),
  category: yup.object().required('required').nullable(),
  price: yup
    .string()
    .trim()
    .nullable()
    .when('isFree', {
      is: false,
      then: schema =>
        schema
          .required('Price is required')
          .test('greater-than-zero', 'Price must be greater than 0', value => {
            const number = parseFloat(value ?? '');
            return !isNaN(number) && number > 0;
          }),
      otherwise: schema => schema.nullable(),
    }),
  date: yup
    .string()
    .nullable()
    .when('isSchedule', {
      is: false,
      then: schema => schema.nullable(),
      otherwise: schema => schema.required('Date is required'),
    }),
  time: yup
    .string()
    .trim()
    .nullable()
    .when('isSchedule', {
      is: false,
      then: schema => schema.nullable(),
      otherwise: schema => schema.required('Time is required'),
    }),
  // previewUrl: yup.string().trim().nullable(),
  previewUrl: yup.string().required('required').trim(),
});

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  verificationSchema,
  UserSchema,
  selectCategorySchema,
  resetPasswordSchema,
  reportReasonSchema,
  createContentSchema,
};
