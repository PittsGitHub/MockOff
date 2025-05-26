import { generateMockValue, resetIdCounter } from './generateMockValue.service'
import { JsonObject, JsonValue } from '../types/jsonTypes'

export const generateMockObjects = (
  exampleJsonObject: JsonObject,
  numberOfObjectsToGenerate: number
): JsonObject[] => {
  resetIdCounter()

  const results: JsonObject[] = []

  for (let i = 0; i < numberOfObjectsToGenerate; i++) {
    const newObj: JsonObject = {}

    for (const [key, value] of Object.entries(exampleJsonObject)) {
      if (Array.isArray(value)) {
        newObj[key] = value.map((v) => generateMockValue(v, key))
      } else if (value === null) {
        newObj[key] = null
      } else {
        newObj[key] = generateMockValue(value, key)
      }
    }

    results.push(newObj)
  }

  return results
}
