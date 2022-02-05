var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mergeWithDefaults } from "./merge";
import { makeQuery } from "./query";
import { resolveContent } from "./resolve";
export const createAdapter = (f = fetch, credentials) => {
    const query = makeQuery(f, credentials);
    return {
        getAll: (contentType) => __awaiter(void 0, void 0, void 0, function* () {
            const content = yield query(contentType);
            // @ts-ignore
            return resolveContent(content);
        }),
        get: (contentType, title) => __awaiter(void 0, void 0, void 0, function* () {
            const content = yield query(contentType);
            // @ts-ignore
            const resolved = resolveContent(content);
            return resolved.find(x => x.title === title);
        }),
        merge: mergeWithDefaults
    };
};
