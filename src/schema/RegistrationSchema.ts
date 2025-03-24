import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required'),

    lastName: Yup.string()
        .required('Last name is required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .matches(/[0-9]{10}/, "please enter a valid phone number")
        .required('Phone number is required'),

    address: Yup.string()
        .min(8, 'address must be at least 8 characters')
        .max(200, 'address must be at most 50 characters')
        .required('Address is required'),


    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

    agreeTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
});

export const intialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
}
