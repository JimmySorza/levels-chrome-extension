export type BlockCollapsed = {
    [index: string]: boolean;
};

export type SpaceBlockCollapsed = {
    [index: string]: BlockCollapsed;
};
