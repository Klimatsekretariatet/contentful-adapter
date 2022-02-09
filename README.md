# Contentful Adapter (DEPRECATED)

An adapter for fetching and parsing content from the Contentful API.

Note: For internal usage. Use at your own risk.

````typescript
import { createAdapter } from 'xxx'

const contentfulAdapter = createAdapter(fetch, {
		accessToken: variables.CONTENTFUL_ACCESS_TOKEN,
		spaceId: variables.CONTENTFUL_SPACE_ID
	})

const reports = await client.getAll('fullReport')

const report = await client.get('fullReport', 'nyköping')
````

### Why?

Because I couldn't get the official client to work as I wanted...
