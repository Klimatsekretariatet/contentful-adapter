import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { isLink } from './utils';
export const resolveContent = (content) => {
    return resolveArray(content.items, content);
};
export const resolveArray = (arr, content) => {
    return arr.map((item) => {
        if (isLink(item)) {
            const resolvedLink = resolveLink(item, content);
            //@ts-ignore
            return resolvedLink.sys.type === 'Entry'
                //@ts-ignore
                ? resolveEntry(resolvedLink, content)
                : resolveAsset(resolvedLink);
        }
        else {
            return resolveEntry(item, content);
        }
    });
};
export const resolveAsset = (resource) => {
    return resource.fields.file;
};
export const resolveEntry = (entry, content) => {
    const { fields } = entry;
    if (!fields) {
        throw Error(`fields undefined in entry ${JSON.stringify(entry)}`);
    }
    const fieldNames = Object.keys(fields);
    const resolved = {};
    for (const fieldName of fieldNames) {
        const field = fields[fieldName];
        if (typeof field === 'string' || typeof field === 'number') {
            resolved[fieldName] = field;
        }
        else if (field.nodeType === 'document') {
            resolved[fieldName] = documentToHtmlString(fields[fieldName]);
        }
        else if (isLink(field)) {
            const resolvedLink = resolveLink(field, content);
            if (field.sys.linkType === 'Entry') {
                //@ts-ignore
                resolved[fieldName] = resolveEntry(resolvedLink, content);
            }
            else if (field.sys.linkType === 'Asset') {
                resolved[fieldName] = resolveAsset(resolvedLink);
            }
            else {
                throw Error('Unexpected link type');
            }
        }
        else if (Array.isArray(field)) {
            resolved[fieldName] = resolveArray(field, content);
        }
        else {
            throw Error(`unknown type: ${field}`);
        }
    }
    return resolved;
};
export const resolveLink = (link, content) => {
    let arr;
    if (link.sys.linkType === 'Entry') {
        arr = content.includes.Entry;
    }
    if (link.sys.linkType === 'Asset') {
        arr = content.includes.Asset;
    }
    const found = arr.find((entry) => { var _a; return ((_a = entry.sys) === null || _a === void 0 ? void 0 : _a.id) === link.sys.id; });
    if (!found) {
        throw Error(`Could not resolve link ${link.sys.id}`);
    }
    return found;
};
