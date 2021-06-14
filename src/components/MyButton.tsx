import React from 'react';
import { Button, Color, createMuiTheme, ThemeProvider, ButtonProps } from '@material-ui/core';
import { blueGrey, green } from '@material-ui/core/colors';

export type MyButtonProps = ButtonProps & {
    children: React.ReactNode;
};

const MyButton = ({ children, ...restProps }: MyButtonProps) => {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: green,
                    secondary: blueGrey,
                },
            }),
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <Button {...restProps}>{children}</Button>
        </ThemeProvider>
    );
};

export default React.memo(MyButton);
