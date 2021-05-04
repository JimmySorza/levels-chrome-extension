import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    first_name: Yup.string().required('Please input first name!'),
    last_name: Yup.string().required('Please input last name!'),
    email: Yup.string().email('Invalid email address!').required('Please input email address!'),
    password: Yup.string().min(8, 'Use 8 or more characters!').required('Please input password!'),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        .required('Password confirm is required'),
});

export default SignInSchema;
