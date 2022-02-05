var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const makeQuery = (fetch, credentials) => (contentType) => __awaiter(void 0, void 0, void 0, function* () {
    const API_URL = 'https://cdn.contentful.com';
    console.log('final url', `${API_URL}/spaces/${credentials.spaceId}/environments/master/entries?content_type=${contentType}&access_token=${credentials.accessToken}&include=3`);
    const res = yield fetch(`${API_URL}/spaces/${credentials.spaceId}/environments/master/entries?content_type=${contentType}&access_token=${credentials.accessToken}&include=3`);
    if (!res.ok) {
        throw Error(`${res.status}: ${res.statusText}`);
    }
    try {
        return yield res.json();
    }
    catch (error) {
        throw Error(`Could not parse json`);
    }
});
