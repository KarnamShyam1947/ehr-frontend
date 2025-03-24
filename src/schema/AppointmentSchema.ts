import * as Yup from 'yup';

export const appointmentSchema = Yup.object().shape({
    doctorDepartment: Yup.string()
        .required('Doctor department is required'),
    
    doctor: Yup.string()
        .required("doctor is required"),

    date: Yup.date()
        .required('Date is required')
        .min(new Date(), 'Date must be in the future')// Ensures the date is in the future
        .typeError('Date must be a valid date'),

    slot: Yup.string()
        .required('Slot is required'),

    reason: Yup.string()
        .min(5, 'Reason is too short')
        .max(200, 'Reason is too long')
        .required('Reason is required'),
});

export const initialValues = {
    doctorDepartment: '', 
    doctor: '', 
    date: '', // Empty string to represent no date selected initially
    slot: '', 
    reason: '',
};
