import clsx from 'clsx'
import React, { useState } from 'react'

type MockJsonDataVerbose = {
  key: string
  value: string
}

interface Props {
  mockJsonData: MockJsonDataVerbose[]
}

export const JsonObjectPreview = ({ mockJsonData }: Props) => {
  //React Hooks
  const [copied, setCopied] = useState(false)
  const [exported, setExported] = useState(false)

  //Data Transform
  const transformedData = mockJsonData.reduce(
    (acc, entry) => {
      acc[entry.key] = entry.value
      return acc
    },
    {} as Record<string, string>
  )

  const handleExport = () => {
    const blob = new Blob([JSON.stringify([transformedData], null, 2)], {
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
      await navigator.clipboard.writeText(
        JSON.stringify([transformedData], null, 2)
      )
      console.log('Copied to clipboard!')
      setCopied(true)
      setTimeout(() => setCopied(false), 500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex flex-col space-y-0 w-full max-w-sm">
      {/* <h1 className="text-lg text-pink-100 text-center">json object preview</h1> */}
      {/* <h1 className="text-2xl text-center font-bold tracking-tight mb-1.5">
        preview
      </h1> */}
      {/* one row for the kvp*/}
      {/* <ul className="space-y-0.75">
        {mockJsonData.map((entry, idx) => (
          <li
            key={idx}
            className={clsx(
              'w-full text-center px-4 py-2 rounded-md text-pink-100 border-1 focus:outline-none transition-all delay-100 duration-300 shadow-md',
              'text-pink-100 focus:outline-none border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150 hover:shadow-xl hover:scale-105'
            )}
          >
            <div className="flex justify-between font-mono text-left">
              <span className="font-bold ">{entry.key}:</span>
              <span className="text-indigo-100 w-1/2 text-right">
                {entry.value}
              </span>
            </div>
          </li>
        ))}
      </ul> */}

      <ul className="space-y-0.75">
        {mockJsonData.map((entry, idx) => (
          <li
            key={idx}
            className={clsx(
              'w-full px-2 py-2 rounded-md ',
              'backdrop-blur-md backdrop-saturate-150 transition-all delay-100 duration-300 shadow-md hover:shadow-xl hover:scale-105'
            )}
          >
            <div className="flex space-x-2">
              <div className="flex-1 px-2 py-1 rounded bg-indigo-900 text-pink-100 font-semibold text-center">
                {entry.key}:
              </div>
              <div className="flex-1 px-2 py-1 rounded bg-indigo-800 text-indigo-100 text-center font-mono">
                {entry.value}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-row justify-center space-x-2 w-full max-w-sm">
        <button
          type="button"
          onClick={handleExport}
          className={clsx(
            'flex-1 px-4 py-2 text-indigo-800 font-semibold rounded-lg shadow  transition-all duration-500',
            exported
              ? 'bg-transparent text-pink-100 border-blue-400 ring ring-blue-400 ring-opacity-50 backdrop-blur-md backdrop-saturate-150'
              : 'bg-white hover:bg-pink-100 text-indigo-800 shadow cursor-pointer'
          )}
        >
          {exported ? 'Exported!' : 'Export to .json file'}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className={clsx(
            'flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-500',
            copied
              ? 'bg-transparent text-pink-100  ring-opacity-50 backdrop-blur-md backdrop-saturate-150 shadow-md '
              : 'bg-white hover:bg-pink-100 text-indigo-800 shadow cursor-pointer'
          )}
        >
          {copied ? 'Copied!' : 'Copy .json'}
        </button>
      </div>
    </div>
  )
}
