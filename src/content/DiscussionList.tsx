import { useRedux } from '@redux';
import React from 'react';
import { useStore } from 'react-redux';

import { Button, TextField } from '@material-ui/core';
import { MyBox, MyButton } from 'components';
import { green } from '@material-ui/core/colors';

export type DiscussionListProps = {
    blockId: string;
};

export const DiscussionList = (props: DiscussionListProps) => {
    const store = useStore();
    const commentsState = useRedux('comments');

    const [comment, setComment] = React.useState('');

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (
        <MyBox flex flexDirection="column">
            <MyBox color="success.light">This is comments list</MyBox>
            {props.blockId === commentsState.anchor && commentsState.isInput && (
                <MyBox flex flexDirection="column">
                    <textarea rows={1} value={comment} onChange={handleChangeComment} />
                    <MyBox flex flexDirection="row">
                        <Button disableRipple>Cancel</Button>
                        <MyButton color={green} variant="contained" disableRipple>
                            Comment
                        </MyButton>
                    </MyBox>
                </MyBox>
            )}
        </MyBox>
    );
};
