declare type ContentfulCredentials = {
    spaceId: string;
    accessToken: string;
};
export declare const createAdapter: (f: typeof fetch, credentials: ContentfulCredentials) => {
    getAll: (contentType: string) => Promise<any[]>;
    get: (contentType: string, title: string) => Promise<any>;
    merge: (defaults: Record<string, unknown>, obj: Record<string, unknown>) => Record<string, unknown>;
};
export {};
