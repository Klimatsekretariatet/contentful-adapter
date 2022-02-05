import { isTitledArray, isLink } from './utils'

describe('isLink', () => {
  it('returns true for link', async () => {
    const link = {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: '3xVodv63U9LwQO7fg5g5by'
      }
    }

    expect(isLink(link)).toBe(true)
  })

  it('returns false otherwise', async () => {
    const notLink = {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: ' ',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }

    //@ts-ignore
    expect(isLink(notLink)).toBe(false)
  })
})

describe('isTitledArray', () => {
  it('returns false for array of strings', () => {
    const ordinaryArray = ['cat', 'dog', 'mouse']

    expect(isTitledArray(ordinaryArray)).toBe(false)
  })

  it('returns false if no array', () => {
    expect(isTitledArray({})).toBe(false)
  })

  it('returns false if empty array', () => {
    expect(isTitledArray([])).toBe(false)
  })

  it('returns true for array of titled elements', () => {
    const titled = [{ title: 'rambo1' }, { title: 'rambo2' }, { title: 'rambo3' }]

    expect(isTitledArray(titled)).toBe(true)
  })
})
