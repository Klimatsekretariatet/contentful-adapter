import { mergeWithDefaults } from "./merge"
import { makeQuery } from "./query"
import { resolveContent } from "./resolve"

type ContentfulCredentials = {
    spaceId: string,
    accessToken: string
  }

export const createAdapter = (f = fetch, credentials: ContentfulCredentials) => {
    const query = makeQuery(f, credentials)

    return {
        getAll: async (contentType: string) => {
            const content = await query(contentType)

            // @ts-ignore
            return resolveContent(content)
        },
        get: async (contentType: string, title: string) => {
            const content = await query(contentType)
            
            // @ts-ignore
            const resolved = resolveContent(content)
            
            return resolved.find(x => x.title === title)
        },
        merge: mergeWithDefaults
    }
}
