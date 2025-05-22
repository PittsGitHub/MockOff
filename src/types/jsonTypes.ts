export type JsonPayload = {
  totalItemCount: number
  items: JsonObject[]
}

export type JsonObject = Record<string, JsonValue>

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }
