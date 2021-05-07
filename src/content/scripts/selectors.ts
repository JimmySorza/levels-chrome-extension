import jquery from 'jquery';

export const PageContentEl = () => jquery('.notion-frame .notion-page-content');

export const MenuCommentEl = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container .notion-scroller.vertical div').children(
        ':eq(2)'
    );

export const OverlaySelector = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container')
        .children(':eq(1)')
        .children(':eq(0)')
        .children(':eq(0)');
