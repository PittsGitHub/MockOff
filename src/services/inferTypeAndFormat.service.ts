export const inferTypedValue = (raw: string): string | number | boolean => {
  const trimmed = raw.trim()

  // Boolean check
  if (['true', 't'].includes(trimmed.toLowerCase())) return true
  if (['false', 'f'].includes(trimmed.toLowerCase())) return false
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  // Number check
  if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed)

  return trimmed
}

export const transformWithInferredTypes = (
  data: { key: string; value: string }[]
): Record<string, string | number | boolean> => {
  return data.reduce(
    (acc, entry) => {
      acc[entry.key] = inferTypedValue(entry.value)
      return acc
    },
    {} as Record<string, string | number | boolean>
  )
}

export const buildExportObject = (
  data: { key: string; value: string }[]
): {
  totalItemCount: number
  items: Record<string, string | number | boolean>[]
} => {
  const typed = transformWithInferredTypes(data)
  return {
    totalItemCount: 1,
    items: [typed],
  }
}
