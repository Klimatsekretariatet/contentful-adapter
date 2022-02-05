export const isObject = (x: unknown): boolean =>
  typeof x === 'object' && x !== null && !Array.isArray(x)

export const isTitledArray = (thing: unknown): boolean => {
  return (
    Array.isArray(thing) &&
    thing.length > 0 &&
    thing.every((element) => element.title !== undefined)
  )
}
  
export const isLink = (field: { sys?: { type: string } }): boolean => {
  return field.sys?.type === 'Link'
}
