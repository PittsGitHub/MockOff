import { faker } from '@faker-js/faker'
import { JsonObject, JsonValue } from '../types/jsonTypes'

let idCounter = 1

export const resetIdCounter = () => {
  idCounter = 1
}

const generateMockValue = (key: string, exampleValue: JsonValue): JsonValue => {
  const lowerKey = key.toLowerCase()

  switch (lowerKey) {
    case 'id':
      return idCounter++
    case 'age':
      return faker.number.int({ min: 1, max: 100 })
  }

  const valueType = typeof exampleValue

  switch (valueType) {
    case 'number':
      return faker.number.int({ min: 1, max: 999 })
    case 'boolean':
      return faker.datatype.boolean()
    case 'string':
      if (lowerKey.includes('email')) return faker.internet.email()
      if (lowerKey.includes('name')) return faker.person.firstName()
      if (lowerKey.includes('city')) return faker.location.city()
      if (lowerKey.includes('address')) return faker.location.streetAddress()
      return faker.word.words(2)
    case 'object':
      if (Array.isArray(exampleValue)) {
        return exampleValue.map((item) => generateMockValue(key, item))
      }
      if (exampleValue === null) return null

      // nested object
      const nested: JsonObject = {}
      for (const [nestedKey, nestedVal] of Object.entries(exampleValue)) {
        nested[nestedKey] = generateMockValue(nestedKey, nestedVal)
      }
      return nested

    default:
      return 'UnknownType'
  }
}

export const generateMockObjects = (
  exampleJsonObject: JsonObject,
  numberOfObjectsToGenerate: number
): JsonObject[] => {
  resetIdCounter()

  const results: JsonObject[] = []

  for (let i = 0; i < numberOfObjectsToGenerate; i++) {
    const newObj: JsonObject = {}

    for (const [key, value] of Object.entries(exampleJsonObject)) {
      newObj[key] = generateMockValue(key, value)
    }

    results.push(newObj)
  }

  return results
}
