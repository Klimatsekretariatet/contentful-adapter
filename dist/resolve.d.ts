declare type Link = {
    sys: {
        type: string;
        linkType: string;
        id: string;
    };
};
export declare const resolveContent: (content: {
    items: Array<any>;
}) => any[];
export declare const resolveArray: (arr: Array<any>, content: any) => any[];
export declare const resolveAsset: (resource: any) => any;
export declare const resolveEntry: (entry: {
    fields: any;
}, content?: any) => unknown;
export declare const resolveLink: (link: Link, content: any) => unknown;
export {};
