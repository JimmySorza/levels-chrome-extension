import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';

import { AppState } from '@redux';
import { getMenuCommentEl, getPageContentEl, getStore } from './scripts';
import { DiscussionMenu } from 'components';
import { asyncTimeOut } from 'utils';
import App from './App';

export const setupMenu = () => {
    jquery(document).on('contextmenu', getPageContentEl(), renderMenu);
};

const LevelsMenuDiscussionId = 'levels-menu-discussion';

const renderMenu = async (e: any) => {
    if (!e.target) {
        return;
    }
    if (jquery(`#${LevelsMenuDiscussionId}`).length) {
        return;
    }

    await asyncTimeOut(200);

    const store = getStore();
    const appState: AppState = store.getState();
    const theme = appState?.theme?.mode || 'light';

    const discussionMenuEl = document.createElement('div');
    discussionMenuEl.id = LevelsMenuDiscussionId;
    discussionMenuEl.setAttribute(
        'style',
        `padding-top: 6px; padding-bottom: 6px; box-shadow: ${
            theme === 'light' ? 'rgba(55, 53, 47, 0.09)' : 'rgb(255 255 255 / 7%)'
        } 0px -1px 0px; margin-top: 1px;`
    );

    getMenuCommentEl().after(discussionMenuEl);

    ReactDOM.render(
        <App>
            <DiscussionMenu anchor={e.target} />
        </App>,
        discussionMenuEl
    );
};
