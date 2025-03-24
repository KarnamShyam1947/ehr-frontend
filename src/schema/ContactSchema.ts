import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is too short')
        .max(50, 'Name is too long')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    subject: Yup.string()
        .min(5, 'Subject is too short')
        .max(100, 'Subject is too long')
        .required('Subject is required'),
    message: Yup.string()
        .min(10, 'Message is too short')
        .max(1000, 'Message is too long')
        .required('Message is required'),
});

export const initialValues={ name: '', email: '', subject: '', message: '' }
