import { JsonObject, JsonPayload } from '../types/jsonTypes'
import { inferType } from './typeInference.service'

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export const buildFlatJsonRequestObject = (
  jsonObject: JsonObject
): JsonObject => {
  let newJsonObject: JsonObject = {}

  Object.entries(jsonObject).forEach((kvp) => {
    if (kvp[1]) {
      const valueToString = kvp[1].toString()
      const newValue = inferType(valueToString)
      newJsonObject[kvp[0]] = newValue
    }
  })
  return newJsonObject
}
