export type Pagination = {
    current_page?: number;
    from?: number;
    per_page?: number;
    to?: number;
    last_page?: number;
    total?: string;
};

export type DefaultState<DataType> = {
    isInitLoading?: boolean;
    isLoading?: boolean;
    isDeleting?: boolean;
    isUpdating?: boolean;
    isCreating?: boolean;
    pagination?: Pagination;
    data: DataType;
};

export type StateWithArrayPayload<D> = DefaultState<D[]>;

export type StateWithObjectPayload<D> = DefaultState<D>;

export type ReducerOptions = {
    flushOnError?: boolean;
    flushOnStart?: boolean;
};

export type ResponseWithPagination<DataType> = Pagination & {
    data: DataType[];
};

export type DataWithPagination<Data> = {
    data: Data;
    pagination?: Pagination;
};
