import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'
import clsx from 'clsx'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import { PlusIcon } from '@heroicons/react/24/outline'

function App() {
  //.
  //.spacing to help me read
  //.
  //Mock .json data type declared
  type MockJsonDataVerbose = {
    key: string
    value: string
  }

  //React hook awaiting setMockJsonData to be called triggering re-render of the .tsx where
  //it lives okay so we can do modular guff
  const [mockJsonData, setMockJsonData] = useState<MockJsonDataVerbose[]>([])

  //create a dummy MockJsonDataVerbose object
  const addMeBitch: MockJsonDataVerbose = { key: 'lol', value: 'kek' }

  //additional array of type MockJsonDataVerbose don't mind if I do
  const someNewArray = [addMeBitch, addMeBitch, addMeBitch]

  //as react is dog shit and IMMUTEABLE we can't push to our changes to the state 'mockJsonData'
  //so what we gotta do is be sneaky... we make a newJsonData that is just the existing
  //'mockJsonData' then we can push our dummy object above into this new data then finally
  //we setState triggering a rerender and mockJsonData becomes our newJsonData
  const newMockJsonArray = [...mockJsonData, ...someNewArray, addMeBitch]

  //note this works but if we call it, then it goes ape shit and infinitley loops, WHOOPSIE.
  //WHY THOUGH? well shit for brains because your calling set state every time the page loads
  //so guess what? yeah that's right the state changes so we re-render you donkey.
  //setMockJsonData(newMockJsonArray)

  //json key string and value string react hooks
  const [inputJsonKey, setInputJsonKey] = useState<string>('')
  const [inputJsonValue, setJsonValue] = useState<string>('')

  //handle the add button being pressed
  //we look at the key field value and the value field value
  //we then trim whitespace
  //we create a new MockJsonDataVerboseObject containing sed key values
  //we then create a new array because react immuteable but any existing values
  //we want them in our new array so we add them with the ... important to empty out
  //the array bucket into a new bucket finally!
  //restore status quo for re-render we then set key empty value empty and assign the
  //mockdata to new mockdata we created
  //FUCK ME THIS IS A LOT. lol
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
    }
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(mockJsonData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mockoff-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleRemove = (indexToRemove: number) => {
    const updated = mockJsonData.filter((_, idx) => idx !== indexToRemove)
    setMockJsonData(updated)
  }

  return (
    <div
      className={clsx(
        'min-h-screen',
        'bg-gradient-to-br',
        'from-indigo-800',
        'via-purple-800',
        'to-pink-700',
        'text-white',
        'flex flex-col items-center justify-center',
        'p-8 space-y-6'
      )}
    >
      <h1 className="text-5xl font-bold tracking-tight">Welcome to MockOff</h1>
      <p className="text-lg text-pink-100">
        Minimal version: add items and export to JSON
      </p>

      <div className="flex flex-col space-y-3 w-full max-w-sm">
        <input
          type="text"
          value={inputJsonKey}
          onChange={(e) => setInputJsonKey(e.target.value)}
          className={clsx(
            'w-full text-center px-4 py-2 rounded-md text-white border-2 focus:outline-none transition-all duration-300 shadow-md',
            inputJsonKey.trim() === ''
              ? 'border-pink-400 ring ring-pink-400 ring-opacity-50'
              : 'border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
          )}
          placeholder="Enter key"
        />

        <input
          type="text"
          value={inputJsonValue}
          onChange={(e) => setJsonValue(e.target.value)}
          className={clsx(
            'w-full text-center px-4 py-2 rounded-md text-white border-2 focus:outline-none transition-all duration-300 shadow-md',
            inputJsonValue.trim() === ''
              ? 'border-pink-400 ring ring-pink-400 ring-opacity-50'
              : 'border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
          )}
          placeholder="Enter value"
        />

        <div
          title={
            inputJsonKey.trim() === '' || inputJsonValue.trim() === ''
              ? 'Both key and value must be filled out before adding.'
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
              'w-full text-center px-4 py-2 rounded-md text-white border-2 focus:outline-none transition-all delay-100 duration-300 shadow-md',
              inputJsonKey.trim() === '' || inputJsonValue.trim() === ''
                ? 'text-white font-normal border-pink-400 ring ring-pink-400 ring-opacity-50 cursor-not-allowed'
                : 'text-indigo-800 font-semibold border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150 hover:shadow-xl hover:scale-105'
            )}
          >
            Add
          </button>
        </div>
      </div>

      <ul className="space-y-1">
        {mockJsonData.map((entry, idx) => (
          <li
            key={idx}
            className="text-white flex items-center justify-between bg-indigo-900 px-4 py-2 rounded"
          >
            <span>
              <span className="font-semibold">{entry.key}:</span> {entry.value}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="ml-4 p-1 bg-red-600 hover:bg-red-700 rounded"
            >
              <MinusCircleIcon className="h-5 w-5 text-white" />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleExport}
        className="px-4 py-2 bg-white text-indigo-800 font-semibold rounded-lg shadow hover:bg-pink-100 transition"
      >
        Export to JSON
      </button>
    </div>
  )
}

export default App
