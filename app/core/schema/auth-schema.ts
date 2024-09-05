import * as yup from 'yup';

export const validationAuthSchema = yup.object({
  phone: yup
    .string()
    .required('Please insert your phone number')
    .matches(/^[0-9]+$/, 'Please insert a valid phone number'),
});

export const validationOtpSchema = yup.object({
  otp: yup
    .string()
    .required('Please insert your OTP')
    .matches(/^[0-9]+$/, 'Please insert a valid OTP'),
});
