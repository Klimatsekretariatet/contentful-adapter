import {
    resolveLink,
    resolveEntry,
    resolveAsset,
    resolveContent,
    resolveArray
  } from './resolve'


  import { mockMunicipalityContent} from './mock/municipalityContent'
  

describe('resolveContent', () => {
    it('creates an array with correct length', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const resolvedItems = resolveContent(municipalityContent)
  
      expect(resolvedItems.length).toBe(9)
    })
  
    it('has a "General" element', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const resolvedItems = resolveContent(municipalityContent)
  
      const general = resolvedItems.find((x) => x.title === 'General')
  
      expect(general).toBeDefined()
    })
  
    it('has a "General" element with field sectors', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const resolvedItems = resolveContent(municipalityContent)
      const general = resolvedItems.find((x) => x.title === 'General')
  
      expect(general.sectors).toBeDefined()
    })
  
    it('sectors have content', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const resolvedItems = resolveContent(municipalityContent)
      const general = resolvedItems.find((x) => x.title === 'General')
  
      expect(general.sectors[0]).toBeTruthy()
    })
  })
  
  describe('resolveArray', () => {
    it('resolves an array of links', () => {
      const sectors = [
        {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '3W1dLV4sHKq1asV83nbRVI'
          }
        },
        {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '6puECBnIwXo8wFFbmqAkkl'
          }
        }
      ]
  
      const municipalityContent = mockMunicipalityContent()
  
      const resolved = resolveArray(sectors, municipalityContent)
  
      expect(Array.isArray(resolved)).toBe(true)
      expect(resolved.length).toBe(2)
    })
  
    it('resolves an array of entries', () => {
      const sectors = [
        {
          sys: {
            type: 'Entry'
          },
          fields: {
            foo: 'bar'
          }
        },
        {
          sys: {
            type: 'Entry'
          },
          fields: {
            baz: 'zum'
          }
        }
      ]
  
      const municipalityContent = mockMunicipalityContent()
  
      const resolved = resolveArray(sectors, municipalityContent)
  
      expect(Array.isArray(resolved)).toBe(true)
      expect(resolved.length).toBe(2)
    })
  })
  
  describe('resolveEntry', () => {
    it('resolves documents and strings', () => {
      const entry = {
        metadata: {
          tags: []
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: '6thin052zaeg'
            }
          },
          id: '3xVodv63U9LwQO7fg5g5by',
          type: 'Entry',
          createdAt: '2020-06-09T03:09:09.359Z',
          updatedAt: '2020-06-23T09:05:02.133Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment'
            }
          },
          revision: 3,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'sector'
            }
          },
          locale: 'en'
        },
        fields: {
          title: 'Personbilar (ägarutsläpp)',
          overview: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      'Koldioxidutsläppen i denna sektor kommer från fossildrivna personbilar vars ägare (privatpersoner och företag) är hemmahörande i kommunen. ',
                    nodeType: 'text'
                  }
                ],
                nodeType: 'paragraph'
              }
            ],
            nodeType: 'document'
          },
          comparison: {
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
          },
          sectorBudget: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Bilden visar en jämförelse mellan trenden de senaste x åren för utsläppen i sektorn (röd linje) och hur de skulle utvecklas om de minskade i den takt som budgeten kräver (blå linje). ',
                    marks: [],
                    data: {}
                  }
                ],
                data: {}
              }
            ]
          }
        }
      }
  
      
      const resolved = resolveEntry(entry)
  
      expect(resolved).toEqual({
        title: 'Personbilar (ägarutsläpp)',
        overview:
          '<p>Koldioxidutsläppen i denna sektor kommer från fossildrivna personbilar vars ägare (privatpersoner och företag) är hemmahörande i kommunen. </p>',
        comparison: '<p> </p>',
        sectorBudget:
          '<p>Bilden visar en jämförelse mellan trenden de senaste x åren för utsläppen i sektorn (röd linje) och hur de skulle utvecklas om de minskade i den takt som budgeten kräver (blå linje). </p>'
      })
    })
  
    it('resolves numbers', () => {
      const entry = {
        metadata: {
          tags: []
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: '6thin052zaeg'
            }
          },
          id: '3xVodv63U9LwQO7fg5g5by',
          type: 'Entry',
          createdAt: '2020-06-09T03:09:09.359Z',
          updatedAt: '2020-06-23T09:05:02.133Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment'
            }
          },
          revision: 3,
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'sector'
            }
          },
          locale: 'en'
        },
        fields: {
          foo: 5.3
        }
      }
  
      const resolved = resolveEntry(entry)
  
      expect(resolved).toEqual({
        foo: 5.3
      })
    })
  
    it('resolves entry links to entries', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const entry = {
        fields: {
          foo: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '1PRHQiJRLI34KLEAWoRuNH'
            }
          }
        }
      }
  
      const resolved = resolveEntry(entry, municipalityContent)
  
      expect(resolved).toEqual({
        foo: {
          title: 'Egen uppvärmning av bostäder och lokaler'
        }
      })
    })
  
    it('resolves asset links to assets', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const entry = {
        fields: {
          foo: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '6xRboHKZxVAmNa31Q4nmum'
            }
          }
        }
      }
  
      const resolved = resolveEntry(entry, municipalityContent)
  
      expect(resolved).toEqual({
        foo: {
          url:
            '//images.ctfassets.net/6thin052zaeg/6xRboHKZxVAmNa31Q4nmum/b3b8f6a8b51507dc22dd6b7b575a1e90/nykoping.png',
          details: {
            size: 292,
            image: {
              width: 82,
              height: 98
            }
          },
          fileName: 'nykoping.png',
          contentType: 'image/png'
        }
      })
    })
  })
  
  describe('resolveAsset', () => {
    it('resolves asset', () => {
      const asset = {
        metadata: {
          tags: []
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: '6thin052zaeg'
            }
          },
          id: '6xRboHKZxVAmNa31Q4nmum',
          type: 'Asset',
          createdAt: '2020-06-09T03:08:45.055Z',
          updatedAt: '2020-06-09T03:08:45.055Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment'
            }
          },
          revision: 1,
          locale: 'en'
        },
        fields: {
          title: 'nykoping',
          file: {
            url:
              '//images.ctfassets.net/6thin052zaeg/6xRboHKZxVAmNa31Q4nmum/b3b8f6a8b51507dc22dd6b7b575a1e90/nykoping.png',
            details: {
              size: 292,
              image: {
                width: 82,
                height: 98
              }
            },
            fileName: 'nykoping.png',
            contentType: 'image/png'
          }
        }
      }
  
      const resolved = resolveAsset(asset)
  
      expect(resolved).toEqual({
        url:
          '//images.ctfassets.net/6thin052zaeg/6xRboHKZxVAmNa31Q4nmum/b3b8f6a8b51507dc22dd6b7b575a1e90/nykoping.png',
        details: {
          size: 292,
          image: {
            width: 82,
            height: 98
          }
        },
        fileName: 'nykoping.png',
        contentType: 'image/png'
      })
    })
  })
  
  
  describe('resolveLink', () => {
    it('resolved entry has same id', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const link = {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: '3xVodv63U9LwQO7fg5g5by'
        }
      }
  
      const entry = resolveLink(link, municipalityContent)
  
      //@ts-ignore
      expect(entry.sys.id).toBe('3xVodv63U9LwQO7fg5g5by')
    })
  
    it('resolved entry is not of type link', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const link = {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: '3xVodv63U9LwQO7fg5g5by'
        }
      }
  
      const entry = resolveLink(link, municipalityContent)
  
      //@ts-ignore
      expect(entry.sys.type).not.toBe('Link')
    })
  
    it('works for assets also', () => {
      const municipalityContent = mockMunicipalityContent()
  
      const assetLink = {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: '6xRboHKZxVAmNa31Q4nmum'
        }
      }
  
      const entry = resolveLink(assetLink, municipalityContent)
  
      //@ts-ignore
      expect(entry.sys.id).toBe('6xRboHKZxVAmNa31Q4nmum')

      //@ts-ignore
      expect(entry.sys.type).toBe('Asset')
    })
  })
  