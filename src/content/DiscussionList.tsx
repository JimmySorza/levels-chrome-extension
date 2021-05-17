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

    const renderEditBox = () => {
        document.body.addEventListener(
            'dragover',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
            },
            false
        );
        document.body.addEventListener(
            'drop',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
            },
            false
        );

        if (props.blockId === commentsState.anchor && commentsState.isInput) {
            return (
                <MyBox display="flex" flexDirection="column">
                    <MyBox>
                        <textarea rows={1} value={comment} onChange={handleChangeComment} style={{ width: '100%' }} />
                    </MyBox>
                    <MyBox display="flex" flexDirection="row" justifyContent="flex-end" py={2}>
                        <Button disableRipple>Cancel</Button>
                        <MyButton color={green} variant="contained" disableRipple>
                            Comment
                        </MyButton>
                    </MyBox>
                </MyBox>
            );
        }
        return null;
    };

    return (
        <MyBox display="flex" flexDirection="column" padding={2}>
            <MyBox color="success.light">This is comments list</MyBox>
            {renderEditBox()}
        </MyBox>
    );
};
