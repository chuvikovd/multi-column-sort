export declare type Direction = 'ASC' | 'DESC';
export declare type SortArray<T> = [keyof T, Direction][];
export declare type SortObject<T> = {
    [key in keyof T]?: Direction;
};
export declare type GetColumnValue<T> = (column: keyof T, value: T[keyof T], row: T) => any;
declare const multiColumnSort: <T>(arr: T[], sortArrOrObject: SortArray<T> | SortObject<T>, getColumnValue?: GetColumnValue<T> | undefined) => T[];
export default multiColumnSort;
