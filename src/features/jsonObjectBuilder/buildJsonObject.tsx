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

  const addButtonEnabled =
    inputJsonKey.trim() !== '' && inputJsonValue.trim() !== ''

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
      {/* <h1 className="text-2xl text-center font-bold tracking-tight mb-1.5">
        property
      </h1> */}
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
            inputJsonKey.trim() === '' || inputJsonValue.trim() === ''
              ? 'Input key & value to enable Add'
              : ''
          }
        >
          <button
            type="button"
            onClick={handleAdd}
            disabled={
              inputJsonKey.trim() === '' || inputJsonValue.trim() === ''
            }
            className={clsx(
              'focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-50 focus-visible:backdrop-blur-md focus-visible:backdrop-saturate-150',
              'w-full text-center px-4 py-2 rounded-md  transition-all duration-600 shadow-md',
              // 'focus-visible:ring focus-visible:ring-pink-300 focus-visible:ring-offset-2',
              inputJsonKey.trim() === '' || inputJsonValue.trim() === ''
                ? 'text-pink-300 font-normal line-through bg-purple-950 cursor-not-allowed'
                : 'bg-white text-indigo-800 hover:bg-pink-100 font-semibold cursor-pointer '
            )}
          >
            {addButtonEnabled ? 'Add property' : 'Add property'}
          </button>
        </div>
      </div>
    </div>
  )
}

//  className={clsx(
//             'flex-1 px-4 py-2 font-semibold rounded-lg shadow transition',
//             activeView === 'builder'
//               ? 'border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
//               : 'bg-white text-indigo-800 hover:bg-pink-100'
//           )}
