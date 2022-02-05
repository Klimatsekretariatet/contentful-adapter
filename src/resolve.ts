import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { isLink } from './utils'

type Link = { sys: { type: string; linkType: string; id: string } }

export const resolveContent = (content: { items: Array<any> }) => {
    return resolveArray(content.items, content)
  }
  
  export const resolveArray = (arr: Array<any>, content: any) => {
    return arr.map((item) => {
      if (isLink(item)) {
        const resolvedLink = resolveLink(item, content)
  
        //@ts-ignore
        return resolvedLink.sys.type === 'Entry'
          //@ts-ignore
          ? resolveEntry(resolvedLink, content)
          : resolveAsset(resolvedLink)
      } else {
        return resolveEntry(item, content)
      }
    })
  }
  
  export const resolveAsset = (resource: any): any => {
    return resource.fields.file
  }
  
  export const resolveEntry = (entry: { fields: any }, content?: any): unknown => {
    const { fields } = entry
    if (!fields) {
      throw Error(`fields undefined in entry ${JSON.stringify(entry)}`)
    }
    const fieldNames = Object.keys(fields)
  
    const resolved = {}
  
    for (const fieldName of fieldNames) {
      const field = fields[fieldName]
  
      if (typeof field === 'string' || typeof field === 'number') {
        resolved[fieldName] = field
      } else if (field.nodeType === 'document') {
        resolved[fieldName] = documentToHtmlString(fields[fieldName])
      } else if (isLink(field)) {
        const resolvedLink = resolveLink(field, content)
  
        if (field.sys.linkType === 'Entry') {
          //@ts-ignore
          resolved[fieldName] = resolveEntry(resolvedLink, content)
        } else if (field.sys.linkType === 'Asset') {
          resolved[fieldName] = resolveAsset(resolvedLink)
        } else {
          throw Error('Unexpected link type')
        }
      } else if (Array.isArray(field)) {
        resolved[fieldName] = resolveArray(field, content)
      } else {
        throw Error(`unknown type: ${field}`)
      }
    }
  
    return resolved
  }
  
  export const resolveLink = (link: Link, content: any): unknown => {
    let arr: Array<any>
  
    if (link.sys.linkType === 'Entry') {
      arr = content.includes.Entry
    }
  
    if (link.sys.linkType === 'Asset') {
      arr = content.includes.Asset
    }
  
    const found = arr.find((entry) => entry.sys?.id === link.sys.id)
  
    if (!found) {
      throw Error(`Could not resolve link ${link.sys.id}`)
    }
  
    return found
  }
