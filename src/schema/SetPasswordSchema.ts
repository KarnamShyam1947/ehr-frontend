// src/schema/SetPasswordSchema.ts
import * as Yup from 'yup';

export const setPasswordSchema = Yup.object().shape({
    token: Yup.string()
        .required('Token is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});