import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
})

export const RegisterSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('ConfirmPassword is required'),
})

export const AddBlogSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    content: Yup.string().required('Content is required'),
})

export const AddCategorySchema = Yup.object({
    name: Yup.string().required('Category Name is required'),
    description: Yup.string().required('Description is required'),
})
