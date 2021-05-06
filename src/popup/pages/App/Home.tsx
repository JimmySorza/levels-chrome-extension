import React from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import { Box } from 'components';

export const PageHome = () => {
    return (
        <Box p={1}>
            <Container>
                <Typography align="center" variant="h5">
                    Levels
                </Typography>
                <Divider variant="fullWidth" />
                <Typography align="center" variant="h6">
                    Please use comment system
                </Typography>
            </Container>
        </Box>
    );
};

export default PageHome;
