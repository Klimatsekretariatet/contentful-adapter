import {
    mergeWithDefaults,
    mergeTitledArrays
  } from './merge'

  describe('mergeTitledArrays', () => {
    it('empty', () => {
      const defaultsArr = [{ title: 'foo' }, { title: 'bar' }]
      const objArr = []
  
      const resArr = mergeTitledArrays(defaultsArr, objArr)
  
      expect(resArr).toEqual([{ title: 'foo' }, { title: 'bar' }])
    })
  
    it('replace both', () => {
      const defaultsArr = [
        { title: 'foo', stars: 3 },
        { title: 'bar', stars: 5 }
      ]
      const objArr = [
        { title: 'foo', stars: 1 },
        { title: 'bar', stars: 2 }
      ]
  
      const resArr = mergeTitledArrays(defaultsArr, objArr)
  
      expect(resArr).toEqual([
        { title: 'foo', stars: 1 },
        { title: 'bar', stars: 2 }
      ])
    })
  
    it('replace one', () => {
      const defaultsArr = [
        { title: 'foo', stars: 3 },
        { title: 'bar', stars: 5 }
      ]
      const objArr = [{ title: 'foo', stars: 1 }]
  
      const resArr = mergeTitledArrays(defaultsArr, objArr)
  
      expect(resArr).toEqual([
        { title: 'foo', stars: 1 },
        { title: 'bar', stars: 5 }
      ])
    })
  
    it('custom element', () => {
      const defaultsArr = [
        { title: 'foo', stars: 3 },
        { title: 'bar', stars: 5 }
      ]
      const objArr = [{ title: 'baz', stars: 1 }]
  
      const resArr = mergeTitledArrays(defaultsArr, objArr)
  
      expect(resArr).toEqual([
        { title: 'foo', stars: 3 },
        { title: 'bar', stars: 5 },
        { title: 'baz', stars: 1 }
      ])
    })
  })
  
  describe('mergeWithDefaults', () => {
    it('merges empty objects', () => {
      const res = mergeWithDefaults({}, {})
  
      expect(res).toEqual({})
    })
  
    it('objects with primitive properties', () => {
      const res = mergeWithDefaults({ a: 'fof', b: 23 }, { b: 18 })
  
      expect(res).toEqual({
        a: 'fof',
        b: 18
      })
    })
  
    describe('nested objects:', () => {
      it('empty object', () => {
        const defaults = {
          pet: {
            kind: 'dog',
            name: 'fido',
            extraInfo: {
              happy: true
            }
          }
        }
  
        const obj = {}
  
        const res = mergeWithDefaults(defaults, obj)

        //@ts-ignore
        expect(res.pet.name).toBe('fido')

        //@ts-ignore
        expect(res.pet.extraInfo.happy).toBe(true)
      })
  
      it('case1', () => {
        const defaults = {
          pet: {
            kind: 'dog',
            name: 'fido',
            extraInfo: {
              happy: true
            }
          }
        }
  
        const obj = {
          pet: {
            name: 'bob',
            extraInfo: {
              happy: false
            }
          }
        }
  
        const res = mergeWithDefaults(defaults, obj)

        //@ts-ignore
        expect(res.pet.name).toBe('bob')

        //@ts-ignore
        expect(res.pet.kind).toBe('dog')

        //@ts-ignore
        expect(res.pet.extraInfo.happy).toBe(false)
      })
  
      it('case2: include properties that only exist in custom', () => {
        const defaults = {
          pet: {
            kind: 'dog',
            name: 'fido',
            extraInfo: {
              happy: true
            }
          }
        }
  
        const obj = {
          pet: {
            name: 'bob',
            extraInfo: {
              happy: false
            },
            age: 24
          }
        }
  
        const res = mergeWithDefaults(defaults, obj)

        //@ts-ignore
        expect(res.pet.age).toBe(24)
      })
    })
  
    describe('arrays (with titles):', () => {
      it('empty obj', () => {
        const defaults = {
          movies: [
            { title: 'rambo 1', rating: 1 },
            { title: 'rambo 2', rating: 2 },
            { title: 'rambo 3', rating: 3 }
          ]
        }
  
        const obj = {}
  
        const res = mergeWithDefaults(defaults, obj)
        expect(res).toEqual({
          movies: [
            { title: 'rambo 1', rating: 1 },
            { title: 'rambo 2', rating: 2 },
            { title: 'rambo 3', rating: 3 }
          ]
        })
      })
  
      it('overwrite elements with same title', () => {
        const defaults = {
          movies: [
            { title: 'rambo 1', rating: 1 },
            { title: 'rambo 2', rating: 2 },
            { title: 'rambo 3', rating: 3 }
          ]
        }
  
        const obj = {
          movies: [
            { title: 'rambo 1', rating: 5 },
            { title: 'rambo 3', rating: 5 }
          ]
        }
  
        const res = mergeWithDefaults(defaults, obj)
        expect(res).toEqual({
          movies: [
            { title: 'rambo 1', rating: 5 },
            { title: 'rambo 2', rating: 2 },
            { title: 'rambo 3', rating: 5 }
          ]
        })
      })
    })
  
    describe('arrays (no titles!)', () => {
      it('will replace (and not merge) arrays without titles', () => {
        const defaults = {
          favoriteFruits: ['apples', 'pears']
        }
  
        const custom = {
          favoriteFruits: ['oranges']
        }
  
        const result = mergeWithDefaults(defaults, custom)
  
        expect(result).toEqual({
          favoriteFruits: ['oranges']
        })
      })
    })
  })
  