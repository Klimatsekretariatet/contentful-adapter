import { isObject, isTitledArray } from './utils';
export const mergeTitledArrays = (defaultsArr, objArr) => {
    const defaultTitles = defaultsArr.map((x) => x.title);
    const customTitles = objArr.map((x) => x.title);
    // Uniques only
    const titles = Array.from(new Set([...defaultTitles, ...customTitles]));
    return titles.map((title) => {
        const customElement = objArr.find((x) => x.title === title);
        const defaultElement = defaultsArr.find((x) => x.title === title);
        if (defaultElement === undefined) {
            return customElement;
        }
        if (customElement === undefined) {
            return defaultElement;
        }
        return mergeWithDefaults(defaultElement, customElement);
    });
};
export const mergeWithDefaults = (defaults, obj) => {
    const result = {};
    // Uniques only
    const properties = Array.from(new Set([...Object.keys(defaults), ...Object.keys(obj)]));
    for (const property of properties) {
        if (obj[property] === undefined) {
            result[property] = defaults[property];
        }
        else if (defaults[property] === undefined) {
            result[property] = obj[property];
        }
        else {
            if (isObject(defaults[property])) {
                //@ts-ignore
                result[property] = mergeWithDefaults(defaults[property], obj[property]);
            }
            else if (isTitledArray(defaults[property])) {
                //@ts-ignore
                result[property] = mergeTitledArrays(defaults[property], obj[property]);
            }
            else {
                result[property] = obj[property];
            }
        }
    }
    return result;
};
