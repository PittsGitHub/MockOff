export type JsonPayload = {
  totalItemCount: number
  items: Record<string, JsonValue>[]
}

export type JsonObject = {
  jsonObjectProperties: JsonObjectProperty[]
}
export type JsonObjectProperty = {
  key: string
  value: JsonValue
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }
