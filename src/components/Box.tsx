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
} from '@material-ui/system';

export const Box = styled('div')(
    compose(spacing, palette, border, display, flexbox, positions, shadows, sizing, typography)
);
