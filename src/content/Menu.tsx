import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';

import { AppState } from '@redux';
import { getMenuCommentEl, getPageContentEl, getStore, LEVELS_MENU_DISCUSSION_ID } from './scripts';
import { DiscussionMenu } from 'components';
import { asyncTimeOut } from 'utils/asyncTimeout';
import App from './App';

export const setupMenu = () => {
    jquery(document).on('contextmenu', getPageContentEl(), renderMenu);
};

const renderMenu = async (e: any) => {
    if (!e.target) {
        return;
    }
    if (jquery(`#${LEVELS_MENU_DISCUSSION_ID}`).length) {
        return;
    }

    await asyncTimeOut(200);

    const store = getStore();
    const appState: AppState = store.getState();

    const discussionMenuEl = document.createElement('div');
    discussionMenuEl.id = LEVELS_MENU_DISCUSSION_ID;
    discussionMenuEl.setAttribute('style', `padding-top: 6px; padding-bottom: 6px;  margin-top: 1px;`);

    getMenuCommentEl().after(discussionMenuEl);

    ReactDOM.render(
        <App>
            <DiscussionMenu anchor={e.target} />
        </App>,
        discussionMenuEl
    );
};
