import clsx from 'clsx'
import { useState } from 'react'
import { JsonObject } from '../types/jsonTypes'
import { buildFlatJsonRequestObject } from '../services/buildJsonPayload.service'

interface Props {
  jsonObject: JsonObject
}
export const JsonObjectExport = ({ jsonObject }: Props) => {
  const [copied, setCopied] = useState(false)
  const [exported, setExported] = useState(false)

  const exportData: JsonObject = buildFlatJsonRequestObject(jsonObject)

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mockoff-data.json'
    a.click()
    URL.revokeObjectURL(url)

    setExported(true)
    setTimeout(() => setExported(false), 500)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
      console.log('Copied to clipboard!')
      setCopied(true)
      setTimeout(() => setCopied(false), 500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="mt-4 flex flex-row justify-center space-x-2 w-full max-w-sm">
      <button
        type="button"
        onClick={handleExport}
        className={clsx(
          'flex-1 px-4 py-2 text-indigo-800 font-semibold rounded-lg shadow  transition-all duration-600',
          exported
            ? 'bg-transparent text-pink-100 border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
            : 'bg-white hover:bg-pink-300 text-indigo-800 shadow cursor-pointer'
        )}
      >
        {exported ? 'Exported!' : 'Export object'}
      </button>

      <button
        type="button"
        onClick={handleCopy}
        className={clsx(
          'flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-600',
          copied
            ? 'bg-transparent text-pink-100  ring-opacity-50 backdrop-blur-md backdrop-saturate-150 shadow-md '
            : 'bg-white hover:bg-pink-300 text-indigo-800 shadow cursor-pointer'
        )}
      >
        {copied ? 'Copied!' : 'Copy object'}
      </button>
    </div>
  )
}
