import clsx from 'clsx'
import { useState } from 'react'
import {
  JsonObject,
  JsonObjectProperty,
  JsonPayload,
} from '../../types/jsonTypes'
import { buildJsonPayload as buildJsonPayload } from '../../services/buildJsonPayload.service'

interface Props {
  jsonObject: JsonObject
  setJsonObject: (jsonObject: JsonObject) => void
}

export const JsonObjectProperties = ({ jsonObject, setJsonObject }: Props) => {
  const [copied, setCopied] = useState(false)
  const [exported, setExported] = useState(false)

  // testing with 5 duplicate objects
  const jsonObjects: JsonObject[] = [
    jsonObject,
    jsonObject,
    jsonObject,
    jsonObject,
    jsonObject,
  ]
  const exportData: JsonPayload = buildJsonPayload(jsonObjects)

  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<'key' | 'value' | null>(null)
  const [tempEdit, setTempEdit] = useState<string>('')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const handleExport = () => {
    const blob = new Blob([JSON.stringify([exportData], null, 2)], {
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
      await navigator.clipboard.writeText(JSON.stringify([exportData], null, 2))
      console.log('Copied to clipboard!')
      setCopied(true)
      setTimeout(() => setCopied(false), 500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex flex-col space-y-0 w-full max-w-sm">
      <ul className="space-y-0.75">
        {jsonObject.jsonObjectProperties.map((entry, idx) => (
          <li
            key={entry.key}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={clsx(
              'w-full px-2 py-2 rounded-md',
              'backdrop-blur-md backdrop-saturate-150 transition-all delay-100 duration-300 shadow-xl hover:shadow-xl hover:scale-105'
            )}
          >
            <div className="flex ">
              {/* KEY - shrink to 4/9 if hovering */}
              <div
                className={clsx(
                  'px-1 py-1 rounded font-mono cursor-pointer m-1',
                  'overflow-hidden whitespace-nowrap text-ellipsis text-center content-center flex items-center justify-center',

                  hoveredIdx === idx
                    ? 'w-4/9 bg-indigo-900 text-pink-100'
                    : 'w-1/2 bg-indigo-900 text-pink-100'
                )}
                onClick={() => {
                  setEditingIdx(idx)
                  setEditingField('key')
                  setTempEdit(entry.key)
                }}
              >
                {editingIdx === idx && editingField === 'key' ? (
                  <textarea
                    rows={1}
                    value={tempEdit}
                    onChange={(e) => setTempEdit(e.target.value)}
                    onBlur={() => {
                      const updatedProperties = [
                        ...jsonObject.jsonObjectProperties,
                      ]
                      const oldEntry = updatedProperties[idx]

                      updatedProperties[idx] = {
                        ...oldEntry,
                        key:
                          tempEdit.trim() === ''
                            ? oldEntry.key
                            : tempEdit.trim(),
                      }

                      setJsonObject({ jsonObjectProperties: updatedProperties })
                      setEditingIdx(null)
                      setEditingField(null)
                    }}
                    className={clsx(
                      'w-full  font-mono  resize-none',
                      'text-center',
                      'placeholder-pink-100 focus:placeholder-transparent',
                      'rounded focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none',
                      'transition-all duration-300 shadow-md bg-transparent'
                    )}
                    autoFocus
                  />
                ) : (
                  `${entry.key}`
                )}
              </div>

              {/* VALUE - shrink to 4/9 if hovering*/}
              <div
                className={clsx(
                  'px-1 py-1 rounded font-mono cursor-pointer m-1',
                  'overflow-hidden whitespace-nowrap text-ellipsis text-center content-center flex items-center justify-center',
                  hoveredIdx === idx
                    ? 'w-4/9 bg-indigo-800 text-indigo-100'
                    : 'w-1/2 bg-indigo-800 text-indigo-100'
                )}
                onClick={() => {
                  setEditingIdx(idx)
                  setEditingField('value')
                  setTempEdit(entry.value as string)
                }}
              >
                {editingIdx === idx && editingField === 'value' ? (
                  <textarea
                    rows={1}
                    value={tempEdit}
                    onChange={(e) => setTempEdit(e.target.value)}
                    onBlur={() => {
                      const updatedProperties = [
                        ...jsonObject.jsonObjectProperties,
                      ]
                      const oldEntry = updatedProperties[idx]

                      updatedProperties[idx] = {
                        ...oldEntry,
                        value:
                          tempEdit.trim() === ''
                            ? oldEntry.value
                            : tempEdit.trim(),
                      }

                      setJsonObject({ jsonObjectProperties: updatedProperties })
                      setEditingIdx(null)
                      setEditingField(null)
                    }}
                    className={clsx(
                      'w-full  font-mono  resize-none',
                      'text-center',
                      'placeholder-pink-100 focus:placeholder-transparent',
                      'rounded focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none',
                      'transition-all duration-300 shadow-md bg-transparent'
                    )}
                    autoFocus
                  />
                ) : typeof entry.value === 'string' ||
                  typeof entry.value === 'number' ? (
                  entry.value
                ) : (
                  JSON.stringify(entry.value)
                )}
              </div>
              {/* DELETE PANEL — 1/9 conditionally rendered on hover*/}
              {hoveredIdx === idx && (
                <div
                  className={clsx(
                    'w-1/9 m-1 px-2 py-1 rounded bg-purple-950 text-center content-center transition-all duration-600',
                    ' hover:bg-white text-pink-700 shadow cursor-pointer font-bold'
                  )}
                  onClick={() => {
                    const updatedJsonProperties: JsonObjectProperty[] =
                      jsonObject.jsonObjectProperties.filter(
                        (_, i) => i !== idx
                      )
                    const updatedJsonObject: JsonObject = {
                      jsonObjectProperties: updatedJsonProperties,
                    }
                    setJsonObject(updatedJsonObject)
                  }}
                  title="Delete property"
                >
                  x
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

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
          {exported ? 'Exported!' : 'Export to .json file'}
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
          {copied ? 'Copied!' : 'Copy .json'}
        </button>
      </div>
    </div>
  )
}
