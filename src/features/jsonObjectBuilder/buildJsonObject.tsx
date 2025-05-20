import { useRef, useState } from 'react'
import { JsonObject, JsonObjectProperty } from '../../types/jsonTypes'
import clsx from 'clsx'

interface Props {
  jsonObject: JsonObject
  setJsonObject: (jsonObject: JsonObject) => void
}

export const BuildJsonObject = ({ jsonObject, setJsonObject }: Props) => {
  const [inputJsonPropertyKey, setInputJsonPropertyKey] = useState<string>('')
  const [inputJsonPropertyValue, setJsonPropertyValue] = useState<string>('')
  const trimmedKey = inputJsonPropertyKey.trim()
  const trimmedValue = inputJsonPropertyValue.trim()

  const isDuplicate = jsonObject.jsonObjectProperties.some(
    (entry) => entry.key === trimmedKey
  )

  const addButtonEnabled =
    inputJsonPropertyKey.trim() !== '' &&
    inputJsonPropertyValue.trim() !== '' &&
    !isDuplicate

  const handleAdd = () => {
    // If our key and value are not empty
    if (
      inputJsonPropertyKey.trim() !== '' &&
      inputJsonPropertyValue.trim() !== ''
    ) {
      // then we create a new property for our object
      const newJsonObjectProperty: JsonObjectProperty = {
        key: inputJsonPropertyKey,
        value: inputJsonPropertyValue,
      }
      // we create a new array of json properties
      // it includes the existing properties plus our new property
      const newJsonProperties: JsonObjectProperty[] = [
        ...jsonObject.jsonObjectProperties,
        newJsonObjectProperty,
      ]

      // finally we create a new json object with our
      // new property appended to our existing properties
      const newJsonObject: JsonObject = {
        jsonObjectProperties: newJsonProperties,
      }

      // we then call back and set the new Json object
      // we also reset the input for key and value
      setJsonObject(newJsonObject)
      setInputJsonPropertyKey('')
      setJsonPropertyValue('')

      inputKeyRef.current?.focus()
    }
  }

  const inputKeyRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col space-y-1 w-full max-w-sm">
      <div
        className={clsx(
          'w-full px-4 py-4 rounded-md space-y-2',
          'backdrop-blur-md backdrop-saturate-150',
          'bg-indigo-950/30',
          'shadow-md'
        )}
      >
        <input
          ref={inputKeyRef}
          type="text"
          value={inputJsonPropertyKey}
          onChange={(e) => setInputJsonPropertyKey(e.target.value)}
          className={clsx(
            'placeholder-pink-100',
            'focus:placeholder-transparent',
            'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
            'bg-indigo-900 w-full text-center px-4 py-2 rounded-md text-white focus:outline-none transition-all duration-300 shadow-md ',
            inputJsonPropertyKey.trim() === '' ? '  animate-pulse' : '  '
          )}
          placeholder="Enter key"
        />
        <input
          type="text"
          value={inputJsonPropertyValue}
          onChange={(e) => setJsonPropertyValue(e.target.value)}
          className={clsx(
            'placeholder-pink-100',
            'focus:placeholder-transparent',
            'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
            'bg-indigo-800 w-full text-center px-4 py-2 rounded-md text-white focus:outline-none transition-all duration-300 shadow-md ',
            inputJsonPropertyKey.trim() !== '' &&
              inputJsonPropertyValue.trim() === ''
              ? 'animate-pulse'
              : ''
          )}
          placeholder="Enter value"
        />

        <div
          title={
            trimmedKey === ''
              ? 'Missing Key'
              : trimmedValue === ''
                ? 'Missing Value'
                : isDuplicate
                  ? 'That key already exists'
                  : ''
          }
        >
          <button
            type="button"
            onClick={handleAdd}
            disabled={!addButtonEnabled}
            className={clsx(
              'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
              'w-full text-center px-4 py-2 rounded-md  transition-all duration-600 shadow-md',
              inputJsonPropertyKey.trim() === '' ||
                inputJsonPropertyValue.trim() === '' ||
                isDuplicate
                ? 'text-pink-300 font-normal line-through bg-purple-950 cursor-not-allowed'
                : 'bg-white text-indigo-800 hover:bg-pink-300 font-semibold cursor-pointer '
            )}
          >
            {addButtonEnabled ? 'Add property' : 'Add property'}
          </button>
        </div>
      </div>
    </div>
  )
}
