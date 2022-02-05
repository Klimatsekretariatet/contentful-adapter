export const isObject = (x) => typeof x === 'object' && x !== null && !Array.isArray(x);
export const isTitledArray = (thing) => {
    return (Array.isArray(thing) &&
        thing.length > 0 &&
        thing.every((element) => element.title !== undefined));
};
export const isLink = (field) => {
    var _a;
    return ((_a = field.sys) === null || _a === void 0 ? void 0 : _a.type) === 'Link';
};
