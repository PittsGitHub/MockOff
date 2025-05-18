import { useRef, useState } from 'react'
import clsx from 'clsx'

type MockJsonDataVerbose = {
  key: string
  value: string
}

interface Props {
  mockJsonData: MockJsonDataVerbose[]
  setMockJsonData: (data: MockJsonDataVerbose[]) => void
}

export const BuildJsonObject = ({ mockJsonData, setMockJsonData }: Props) => {
  const [inputJsonKey, setInputJsonKey] = useState<string>('')
  const [inputJsonValue, setJsonValue] = useState<string>('')
  const trimmedKey = inputJsonKey.trim()
  const trimmedValue = inputJsonValue.trim()
  const isDuplicate = mockJsonData.some((entry) => entry.key === trimmedKey)

  const addButtonEnabled =
    inputJsonKey.trim() !== '' && inputJsonValue.trim() !== '' && !isDuplicate

  const handleAdd = () => {
    if (inputJsonKey.trim() !== '' && inputJsonValue.trim() !== '') {
      const newJsonEntry: MockJsonDataVerbose = {
        key: inputJsonKey,
        value: inputJsonValue,
      }
      const newMockJsonArray = [...mockJsonData, newJsonEntry]
      setMockJsonData(newMockJsonArray)
      setInputJsonKey('')
      setJsonValue('')

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
          value={inputJsonKey}
          onChange={(e) => setInputJsonKey(e.target.value)}
          className={clsx(
            'placeholder-pink-100',
            'focus:placeholder-transparent',
            'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
            'bg-indigo-900 w-full text-center px-4 py-2 rounded-md text-white focus:outline-none transition-all duration-300 shadow-md ',
            inputJsonKey.trim() === '' ? '  animate-pulse' : '  '
          )}
          placeholder="Enter key"
        />
        <input
          type="text"
          value={inputJsonValue}
          onChange={(e) => setJsonValue(e.target.value)}
          className={clsx(
            'placeholder-pink-100',
            'focus:placeholder-transparent',
            'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
            'bg-indigo-800 w-full text-center px-4 py-2 rounded-md text-white focus:outline-none transition-all duration-300 shadow-md ',
            inputJsonKey.trim() !== '' && inputJsonValue.trim() === ''
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
              inputJsonKey.trim() === '' ||
                inputJsonValue.trim() === '' ||
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
