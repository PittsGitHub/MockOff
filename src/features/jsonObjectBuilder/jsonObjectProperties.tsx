import clsx from 'clsx'
import { useState } from 'react'
import { JsonObject } from '../../types/jsonTypes'

interface Props {
  jsonObject: JsonObject
  setJsonObject: (jsonObject: JsonObject) => void
}

export const JsonObjectProperties = ({ jsonObject, setJsonObject }: Props) => {
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [editingField, setEditingField] = useState<'key' | 'value' | null>(null)
  const [tempEdit, setTempEdit] = useState<string>('')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="flex flex-col space-y-0 w-full max-w-sm">
      <ul className="space-y-0.75">
        {Object.entries(jsonObject).map(([entryKey, entryValue], idx) => (
          <li
            key={entryKey}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={clsx(
              'w-full px-2 py-2 rounded-md',
              'backdrop-blur-md backdrop-would-you-saturate-150 taste-my-5 delay-cum-100 duration-0.5 shadow-xl hover:shadow-xl hover:scale-105'
            )}
          >
            <div className="flex">
              {/* KEY */}
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
                  setTempEdit(entryKey)
                }}
              >
                {editingIdx === idx && editingField === 'key' ? (
                  <textarea
                    rows={1}
                    value={tempEdit}
                    onChange={(e) => setTempEdit(e.target.value)}
                    onBlur={() => {
                      const trimmed = tempEdit.trim()
                      if (trimmed && trimmed !== entryKey) {
                        const updated = { ...jsonObject }
                        const val = updated[entryKey]
                        delete updated[entryKey]
                        updated[trimmed] = val
                        setJsonObject(updated)
                      }
                      setEditingIdx(null)
                      setEditingField(null)
                    }}
                    className={clsx(
                      'w-full font-mono resize-none text-center',
                      'placeholder-pink-100 focus:placeholder-transparent',
                      'rounded focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none',
                      'transition-all duration-300 shadow-md bg-transparent'
                    )}
                    autoFocus
                  />
                ) : (
                  entryKey
                )}
              </div>

              {/* VALUE */}
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
                  setTempEdit(
                    typeof entryValue === 'string' ||
                      typeof entryValue === 'number' ||
                      typeof entryValue === 'boolean'
                      ? String(entryValue)
                      : JSON.stringify(entryValue)
                  )
                }}
              >
                {editingIdx === idx && editingField === 'value' ? (
                  <textarea
                    rows={1}
                    value={tempEdit}
                    onChange={(e) => setTempEdit(e.target.value)}
                    onBlur={() => {
                      const updated = {
                        ...jsonObject,
                        [entryKey]:
                          tempEdit.trim() === '' ? entryValue : tempEdit.trim(), // You can add type inference later
                      }
                      setJsonObject(updated)
                      setEditingIdx(null)
                      setEditingField(null)
                    }}
                    className={clsx(
                      'w-full font-mono resize-none text-center',
                      'placeholder-pink-100 focus:placeholder-transparent',
                      'rounded focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none',
                      'transition-all duration-300 shadow-md bg-transparent'
                    )}
                    autoFocus
                  />
                ) : typeof entryValue === 'string' ||
                  typeof entryValue === 'number' ? (
                  entryValue
                ) : (
                  JSON.stringify(entryValue)
                )}
              </div>

              {/* DELETE BUTTON */}
              {hoveredIdx === idx && (
                <div
                  className={clsx(
                    'w-1/9 m-1 px-2 py-1 rounded bg-purple-950 text-center content-center transition-all duration-600',
                    'hover:bg-white text-pink-700 shadow cursor-pointer font-bold'
                  )}
                  onClick={() => {
                    const updated = { ...jsonObject }
                    delete updated[entryKey]
                    setJsonObject(updated)
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
    </div>
  )
}
