import * as yup from 'yup';
import {LiveType} from '~/graphql/generated';

const validTag = yup
  .string()
  .matches(/^[\p{L} ]+$/u, 'Only letters and spaces are allowed')
  .min(1, 'Tag cannot be empty')
  .max(50, 'Tag cannot exceed 50 characters.');

const validJsonTagArray = yup
  .string()
  .test('is-valid-json-tag-array', 'Invalid tag list', value => {
    if (!value) return true; // allow optional
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return false;
      const uniqueTags = new Set();
      return parsed.every(tag => {
        if (typeof tag !== 'string') return false;
        if (!/^[\p{L} ]+$/u.test(tag)) return false;
        if (tag.trim().length === 0 || tag.length > 50) return false;
        if (uniqueTags.has(tag)) return false;
        uniqueTags.add(tag);
        return true;
      });
    } catch {
      return false;
    }
  });

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

const tipSchema = yup.object().shape({
  tip: yup
    .string()
    .trim()
    .required('required')
    .test('greater-than-zero', 'Tip must be greater than 0', value => {
      const number = parseFloat(value ?? '');
      return !isNaN(number) && number > 0;
    }),
});

const paymentDetailsSchema = yup.object().shape({
  tip: yup
    .string()
    .trim()
    .required('required')
    .test('greater-than-zero', 'Tip must be greater than 0', value => {
      const number = parseFloat(value ?? '');
      return !isNaN(number) && number > 0;
    }),
  requiredBalance: yup
    .string()
    .trim()
    .required('required')
    .test('greater-than-zero', 'Tip must be greater than 0', value => {
      const number = parseFloat(value ?? '');
      return !isNaN(number) && number > 0;
    }),
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
    .email('Please enter a valid email address.')
    .required('Email is required.')
    .lowercase()
    .trim(),

  fullName: yup
    .string()
    .min(1, 'Full name is required.')
    .max(100, 'Full name must not exceed 100 characters.')
    .required('Full name is required.')
    .trim(),

  photoUrl: yup.string().nullable(),

  skills: yup.string().required('Please specify your skills.'),

  username: yup
    .string()
    .required('Username is required.')
    .min(3, 'Username must be at least 3 characters.')
    .max(50, 'Username must not exceed 50 characters.')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores.',
    )
    .trim(),

  phoneNumber: yup
    .string()
    .required('Phone number is required.')
    .matches(
      /^[\+]?[1-9][0-9]{7,14}$/,
      'Please enter a valid international phone number.',
    )
    .trim(),

  dateOfBirth: yup
    .date()
    .required('Date of birth is required.')
    .max(new Date(), 'Date of birth cannot be in the future.'),

  gender: yup
    .object({
      title: yup.string().required('Gender title is required.'),
      value: yup
        .string()
        .oneOf(['MALE', 'FEMALE', 'OTHERS'], 'Please select a valid gender.')
        .required('Gender value is required.'),
    })
    .required('Gender is required.'),
});

const createContentSchema = yup.object({
  liveType: yup.string().nullable(),
  title: yup.string().required('required').trim(),
  isFree: yup.boolean().nullable(),
  isSchedule: yup.boolean().nullable(),
  description: yup.string().required('required').trim(),
  category: yup.object().required('required'),
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
  previewUrl: yup
    .string()
    .trim()
    .nullable()
    .when('liveType', {
      is: LiveType.LiveContent,
      then: schema => schema.required('required').trim(),
      otherwise: schema => schema.nullable(),
    }),
});

const supportSchema = yup.object({
  subject: yup
    .string()
    .required('Subject is required.')
    .min(3, 'Subject must be at least 3 characters.')
    .max(100, 'Subject must not exceed 100 characters.'),
  text: yup
    .string()
    .required('Message is required.')
    .min(10, 'Message must be at least 10 characters.')
    .max(300, 'Message must not exceed 300 characters.'),
});

const resumeSchema = yup.object({
  profession: yup
    .string()
    .required('Profession is required.')
    .min(3, 'Profession must be at least 3 characters.')
    .max(100, 'Profession must not exceed 100 characters.'),

  professionalSummary: yup
    .string()
    .required('Professional summary is required.')
    .min(10, 'Professional summary must be at least 10 characters.')
    .max(300, 'Professional summary must not exceed 300 characters.'),

  education: validJsonTagArray.optional(),
  workExperience: validJsonTagArray.optional(),
  skills: validJsonTagArray.optional(),
  languages: validJsonTagArray.optional(),
});

const passwordChangeSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .max(36, 'Must be 36 characters or less')
    .required('Required')
    .trim(),

  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .max(36, 'Must be 36 characters or less')
    .required('New password is required')
    .trim(),

  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password')
    .trim(),
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
  supportSchema,
  resumeSchema,
  passwordChangeSchema,
  tipSchema,
  paymentDetailsSchema,
};
