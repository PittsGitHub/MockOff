import { useState } from 'react'
import { JsonObject } from '../../types/jsonTypes'

interface Props {
  jsonObject: JsonObject
}

export const GenerateJsonObjects = ({ jsonObject }: Props) => {
  const [entryCount, setEntryCount] = useState<number>(1)

  return (
    <div className="flex flex-col space-y-2 w-full max-w-sm">
      <p className="text-lg text-center text-pink-100">
        ✨ Generate Mock Data ✨
      </p>

      <label className="text-pink-100 text-sm">
        Number of Entries to Generate:
      </label>
      <input
        type="number"
        min={1}
        value={entryCount}
        onChange={(e) => setEntryCount(Number(e.target.value))}
        className="px-2 py-1 rounded bg-indigo-900 text-pink-100  focus:outline-none focus:ring focus:ring-blue-400"
      />

      {/* Placeholder for generate button and logic */}
      <button
        type="button"
        disabled
        className="bg-purple-950 text-white rounded py-1 mt-2 opacity-50 cursor-not-allowed"
      >
        Generate (coming soon)
      </button>
    </div>
  )
}
