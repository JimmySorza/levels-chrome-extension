import React from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import { MyBox } from 'components';

export const PageHome = () => {
    return (
        <MyBox p={1}>
            <Container>
                <Typography align="center" variant="h5">
                    Levels
                </Typography>
                <Divider variant="fullWidth" />
                <Typography align="center" variant="h6">
                    Please use comment system
                </Typography>
            </Container>
        </MyBox>
    );
};

export default PageHome;
