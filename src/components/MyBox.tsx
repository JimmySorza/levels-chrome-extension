import React from 'react';
import { styled } from '@material-ui/core/styles';
import {
    compose,
    spacing,
    palette,
    border,
    display,
    flexbox,
    positions,
    shadows,
    sizing,
    typography,
    grid,
} from '@material-ui/system';
import { Box } from '@material-ui/core';

export const MyBox = styled(Box)(
    compose(grid, spacing, palette, border, display, flexbox, positions, shadows, sizing, typography)
);
