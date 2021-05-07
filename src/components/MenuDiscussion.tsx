import React from 'react';
import SmsIcon from '@material-ui/icons/Sms';
import { OverlaySelector } from 'content/scripts/selectors';

export type DiscussionMenuProps = {};

export const DiscussionMenu = (props: DiscussionMenuProps) => {
    const handleClickDiscussion = () => {
        OverlaySelector().click();
    };

    return (
        <div
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
        </div>
    );
};
