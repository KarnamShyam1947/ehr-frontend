import * as Yup from 'yup';

export const applicationSchema = Yup.object().shape({
    // Step 1: Basic Information
    hospitalName: Yup.string()
        .min(2, 'Hospital name is too short')
        .max(100, 'Hospital name is too long')
        .required('Hospital name is required'),
        
    address: Yup.string()
        .required('Address is required'),
    
    hospitalPhone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be in valid format')
        .required('Phone number is required'),

    hospitalMail: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    website: Yup.string()
        .url('Invalid URL format'),

    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    position: Yup.string()
        .required('Position is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be in valid format')
        .required('Phone number is required'),

    experince: Yup.number()
        .positive("Enter a positive number")
        .required("Experiance is required"),

    // Step 3: Resume Information
    resumeUrl: Yup.string()
        .required('Resume is required'),

    type: Yup.string()
        .required('Type of application is required'),
    
    specialization: Yup.string()
        .required('specialization is required'),

    coverLetter: Yup.string()
        .required('Cover letter is required'),

    agreeTerms: Yup.boolean()
        .oneOf([true], 'You must agree to the terms and conditions')
        .required('You must agree to the terms and conditions')
});

export const initialValues = {
    // Step 1: Basic Information
    hospitalName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    hospitalPhone: '',
    hospitalMail: '',
    website: '',

    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    experince: 0,
    

    // Step 3: Additional Information
    resumeUrl: '',
    type: '',
    specialization: '',
    coverLetter: '',
    agreeTerms: false
  };
