import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Typography, Divider } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { styled } from '@material-ui/core/styles';
import MuiButton from '@material-ui/core/Button';

import { Box } from 'components';

const Button = styled(MuiButton)(spacing);

export type PageSignInProps = RouteComponentProps;

export const PageSignIn = (props: PageSignInProps) => {
    const {
        match,
        match: { path, url },
        history,
    } = props;

    const handleClickSignIn = () => {
        window.open('https://www.notion.so/login');
    };

    return (
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
                    <Button variant="contained" color="primary" fullWidth mt={1} onClick={handleClickSignIn}>
                        Sing In
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default PageSignIn;
