import { JsonObject, JsonPayload, JsonValue } from '../types/jsonTypes'

// single primitive type inference
const inferPrimitiveType = (value: string): string | number | boolean => {
  const lower = value.toLowerCase().trim()
  if (['true', 't'].includes(lower)) return true
  if (['false', 'f'].includes(lower)) return false
  if (!isNaN(Number(lower)) && lower !== '') return Number(lower)
  return value
}

const inferType = (value: string): JsonValue => {
  const valueTrimmed = value.trim()

  // determine if array by presense of comma
  if (valueTrimmed.includes(',')) {
    let parts = valueTrimmed.split(',').map((part) => part.trim())

    // handle a single trailing comma in an array
    if (parts[parts.length - 1] === '') {
      const allOthersFilled = parts.slice(0, -1).every((p) => p !== '')
      if (allOthersFilled) {
        parts = parts.slice(0, -1)
      }
    }

    // if there are still empty parts after removing a trailing comma we treat it as a string array
    const hasEmpty = parts.some((p) => p === '')
    if (hasEmpty) return parts

    // we infer the first items type in the array
    const inferredFirst = inferPrimitiveType(parts[0])

    // then each subequent item type much match
    const inferredArray = parts.map(inferPrimitiveType)
    const isHomogeneous = inferredArray.every(
      (item) => typeof item === typeof inferredFirst
    )

    // if all types match the first then we return
    // the collection of types else we return a string collection
    return isHomogeneous ? inferredArray : parts
  }

  // after checking if an array we assert type on single values
  // with string being returned if no match found
  return inferPrimitiveType(valueTrimmed)
}

const makeNewJsonObjectWithValueTypesInfered = (
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

export const buildJsonPayload = (jsonObjects: JsonObject[]): JsonPayload => {
  let jsonPayload: JsonPayload = {
    totalItemCount: jsonObjects.length,
    items: [],
  }
  let transformedItems: JsonObject[] = []

  //loop through all json objects passed formatting their values
  jsonObjects.map((jsonObject) => {
    const valueTypesInferedJsonObject =
      makeNewJsonObjectWithValueTypesInfered(jsonObject)
    transformedItems.push(valueTypesInferedJsonObject)
  })

  jsonPayload.items = [...transformedItems]
  return jsonPayload
}
