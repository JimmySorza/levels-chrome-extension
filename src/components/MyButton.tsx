import React from 'react';
import { Button, Color, createMuiTheme, ThemeProvider, ButtonProps } from '@material-ui/core';

export type MyButtonProps = Omit<ButtonProps, 'color'> & {
    color: Color;
    children: React.ReactNode;
};

export const MyButton = ({ color, children, ...restProps }: MyButtonProps) => {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: color,
                },
            }),
        [color]
    );

    return (
        <ThemeProvider theme={theme}>
            <Button color="primary" {...restProps}>
                {children}
            </Button>
        </ThemeProvider>
    );
};
