import { faker } from '@faker-js/faker'
import { JsonValue } from '../types/jsonTypes'

let idCounter = 1

export const resetIdCounter = () => {
  idCounter = 1
}

// value first, key optional
export const generateMockValue = (
  exampleValue: JsonValue,
  key?: string | null
): JsonValue => {
  const lowerKey = key?.toLowerCase() || ''
  const type = typeof exampleValue

  // key-specific rules
  switch (lowerKey) {
    case 'id':
      return idCounter++
    case 'age':
      return faker.number.int({ min: 1, max: 100 })
    case 'email':
      return faker.internet.email()
    case 'name':
      return faker.person.firstName()
    case 'fullname':
      return faker.person.fullName()
  }

  // fallback by type
  switch (type) {
    case 'number':
      return faker.number.int()
    case 'boolean':
      return faker.datatype.boolean()
    case 'string':
      return faker.word.words(2)
    default:
      return 'Unsupported'
  }
}
