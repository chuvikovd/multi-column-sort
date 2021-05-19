"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sort = function (a, b, columns, getColumnValue) {
    var item = columns[0], others = columns.slice(1);
    var column = item[0], orderBy = item[1];
    var valueA = getColumnValue ? getColumnValue(column, a[column], a) : a[column];
    var valueB = getColumnValue ? getColumnValue(column, b[column], b) : b[column];
    if (orderBy === 'ASC') {
        if (valueA > valueB)
            return 1;
        if (valueA < valueB)
            return -1;
        if (others.length)
            return sort(a, b, others, getColumnValue);
        return 0;
    }
    else {
        if (valueB > valueA)
            return 1;
        if (valueB < valueA)
            return -1;
        if (others.length)
            return sort(a, b, others, getColumnValue);
        return 0;
    }
};
var sortObjectToArray = function (object) {
    return Object.keys(object).reduce(function (arr, column) {
        return __spreadArray(__spreadArray([], arr), [[column, object[column]]]);
    }, []);
};
var multiColumnSort = function (arr, sortArrOrObject, getColumnValue) {
    return __spreadArray([], arr).sort(function (a, b) {
        return sort(a, b, Array.isArray(sortArrOrObject)
            ? sortArrOrObject
            : sortObjectToArray(sortArrOrObject), getColumnValue);
    });
};
exports.default = multiColumnSort;
