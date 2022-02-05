declare type fetchType = (info: RequestInfo, init?: RequestInit) => Promise<Response>;
declare type ContentfulCredentials = {
    spaceId: string;
    accessToken: string;
};
export declare const makeQuery: (fetch: fetchType, credentials: ContentfulCredentials) => (contentType: string) => Promise<unknown>;
export {};
