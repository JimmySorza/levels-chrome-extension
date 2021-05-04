import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Box, Container, TextField, Typography, Divider, Grid } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { styled } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

import { Formik } from 'formik';
import SignInSchema from './validateSignIn';

const Button = styled(MuiButton)(spacing);

export type PageSignInProps = RouteComponentProps;

export const PageSignIn = (props: PageSignInProps) => {
    const {
        match,
        match: { path, url },
        history,
    } = props;

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSignIn = (values: typeof initialValues) => {
        console.log('values', values);
        history.push('/app/home');
    };

    return (
        <div>
            <Box p={1}>
                <Container>
                    <Typography align="center" variant="h5">
                        Levels
                    </Typography>
                    <Divider variant="fullWidth" />
                    <Box pt={2}>
                        <Typography align="center" variant="h6">
                            Sign In
                        </Typography>
                        <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSignIn}>
                            {({ errors, touched, handleChange, handleSubmit, values, handleBlur, setErrors }) => {
                                return (
                                    <form autoComplete="off">
                                        <TextField
                                            required
                                            label="Email"
                                            fullWidth
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched['email'] && errors['email'])}
                                            helperText={errors['email']}
                                        />
                                        <TextField
                                            required
                                            label="Password"
                                            fullWidth
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched['password'] && errors['password'])}
                                            helperText={errors['password']}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            mt={1}
                                            onClick={() => handleSubmit()}
                                        >
                                            Sing In
                                        </Button>
                                        <Box py={1}>
                                            <Grid container direction="row" justify="space-between" alignItems="center">
                                                <Link to="/auth/forget-password">Forget Password?</Link>
                                                <Link to="/auth/sign-up">Sign Up</Link>
                                            </Grid>
                                        </Box>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Box>
                </Container>
            </Box>
        </div>
    );
};

export default PageSignIn;
