import React from 'react';
import SmsIcon from '@material-ui/icons/Sms';
import { makeStyles } from '@material-ui/styles';
import { useStore } from 'react-redux';

import { getSelectableBlockIdByChild, getOverlayEl } from 'content/scripts/selectors';
import { setAnchor, setInput } from '@redux/comments/actions';
import { MyBox } from './MyBox';
import { Theme, useTheme } from '@material-ui/core';
import { useRedux } from '@redux';

export type DiscussionMenuProps = {
    anchor: HTMLElement;
};

export const DiscussionMenu = (props: DiscussionMenuProps) => {
    const store = useStore();
    const commentsState = useRedux('comments');

    React.useEffect(() => {
        const blockId = getSelectableBlockIdByChild(props.anchor);
        if (blockId && !commentsState.isInput) {
            setAnchor(store.dispatch, blockId);
        }
    }, []);

    const handleClickDiscussion = () => {
        setInput(store.dispatch, true);
        getOverlayEl().click();
    };

    return (
        <MyBox
            style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px',
                transition: 'background 20ms ease-in 0s',
                cursor: 'pointer',
            }}
            onClick={handleClickDiscussion}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '14px' }}>
                <SmsIcon fontSize="small" color="primary" />
            </div>
            <div style={{ marginLeft: '8px', marginRight: '14px', minWidth: '0px', flex: '1 1 auto' }}>Discussion</div>
        </MyBox>
    );
};
