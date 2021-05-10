import React from 'react';
import { Avatar, Button, Popover, Input, Grid, InputAdornment } from '@material-ui/core';
import { useRedux } from '@redux';
import { useStore } from 'react-redux';
import { setInput } from '@redux/comments/actions';
import { getSelectableBlockIdByBlockId } from 'content/scripts/selectors';
import { Box } from './Box';

export type ModalCommentProps = {};

export const ModalComment = (props: ModalCommentProps) => {
    const store = useStore();
    const userState = useRedux('user');
    const { isInput = false, anchor: anchorBlockId = '' } = useRedux('comments');

    const anchor = getSelectableBlockIdByBlockId(anchorBlockId).get(0);

    const handleClose = () => {
        setInput(store.dispatch, false);
    };

    return (
        <Popover
            open={isInput}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Box p={1}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Avatar
                            alt={`${userState?.first_name || ''} ${userState?.last_name || ''}`}
                            src={userState.image}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            id="input-with-icon-grid"
                            endAdornment={<InputAdornment position="end">@</InputAdornment>}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" size="small">
                            Comment
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Popover>
    );
};
