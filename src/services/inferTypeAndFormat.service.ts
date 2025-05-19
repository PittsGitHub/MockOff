// single primitive type inference
const inferPrimitiveType = (value: string): string | number | boolean => {
  const lower = value.toLowerCase().trim()
  if (['true', 't'].includes(lower)) return true
  if (['false', 'f'].includes(lower)) return false
  if (!isNaN(Number(lower)) && lower !== '') return Number(lower)
  return value
}

//infer method
export const inferType = (
  value: string
): string | number | boolean | (string | number | boolean)[] => {
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

export const transformWithInferredTypes = (
  data: { key: string; value: string }[]
): Record<
  string,
  string | number | boolean | (string | number | boolean)[]
> => {
  return data.reduce(
    (acc, entry) => {
      acc[entry.key] = inferType(entry.value)
      return acc
    },
    {} as Record<
      string,
      string | number | boolean | (string | number | boolean)[]
    >
  )
}

export const buildExportObject = (
  data: { key: string; value: string }[]
): {
  totalItemCount: number
  items: Record<
    string,
    string | number | boolean | (string | number | boolean)[]
  >[]
} => {
  const typed = transformWithInferredTypes(data)
  return {
    totalItemCount: 1,
    items: [typed],
  }
}
