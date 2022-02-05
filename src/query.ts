
type fetchType = (info: RequestInfo, init?: RequestInit) => Promise<Response>

type ContentfulCredentials = {
  spaceId: string,
  accessToken: string
}

export const makeQuery = (fetch: fetchType, credentials: ContentfulCredentials) => async (
  contentType: string
): Promise<unknown> => {
  const API_URL = 'https://cdn.contentful.com'

  console.log('final url', `${API_URL}/spaces/${credentials.spaceId}/environments/master/entries?content_type=${contentType}&access_token=${credentials.accessToken}&include=3`)

  const res = await fetch(
    `${API_URL}/spaces/${credentials.spaceId}/environments/master/entries?content_type=${contentType}&access_token=${credentials.accessToken}&include=3`
  )

  if (!res.ok) {
    throw Error(`${res.status}: ${res.statusText}`)
  }

  try {
    return await res.json()
  } catch (error) {
    throw Error(`Could not parse json`)
  }
}
