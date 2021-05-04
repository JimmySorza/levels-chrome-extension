import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address!').required('Please input email!'),
    password: Yup.string().required('Please input password!'),
});

export default SignInSchema;
