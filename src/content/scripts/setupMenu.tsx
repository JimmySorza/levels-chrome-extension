import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import { Provider } from 'react-redux';

import { getStore } from './store';
import { DiscussionMenu } from 'components';
import { MenuCommentEl, PageContentEl } from './selectors';
import { asyncTimeOut } from 'utils';

export const setupMenu = () => {
    jquery(document).on('contextmenu', PageContentEl(), renderMenu);
};

const LevelsMenuDiscussionId = 'levels-menu-discussion';

const renderMenu = async () => {
    await asyncTimeOut(200);

    const discussionMenuEl = document.createElement('div');
    discussionMenuEl.id = LevelsMenuDiscussionId;
    discussionMenuEl.setAttribute(
        'style',
        'padding-top: 6px; padding-bottom: 6px; box-shadow: rgba(55, 53, 47, 0.09) 0px -1px 0px; margin-top: 1px;'
    );

    MenuCommentEl().after(discussionMenuEl);

    ReactDOM.render(
        <Provider store={getStore()}>
            <DiscussionMenu />
        </Provider>,
        discussionMenuEl
    );
};
