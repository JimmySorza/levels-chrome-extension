import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import { Provider } from 'react-redux';

import { getStore } from './store';
import { DiscussionMenu } from 'components';
import { getMenuCommentEl, getPageContentEl } from './selectors';
import { asyncTimeOut } from 'utils';

export const setupMenu = () => {
    jquery(document).on('contextmenu', getPageContentEl(), renderMenu);
};

const LevelsMenuDiscussionId = 'levels-menu-discussion';

const renderMenu = async (e: any) => {
    if (!e.target) {
        return;
    }
    await asyncTimeOut(200);

    const discussionMenuEl = document.createElement('div');
    discussionMenuEl.id = LevelsMenuDiscussionId;
    discussionMenuEl.setAttribute(
        'style',
        'padding-top: 6px; padding-bottom: 6px; box-shadow: rgba(55, 53, 47, 0.09) 0px -1px 0px; margin-top: 1px;'
    );

    getMenuCommentEl().after(discussionMenuEl);

    ReactDOM.render(
        <Provider store={getStore()}>
            <DiscussionMenu anchor={e.target} />
        </Provider>,
        discussionMenuEl
    );
};
