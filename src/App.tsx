import clsx from 'clsx'
import { useState } from 'react'
import {
  BuildJsonObject,
  JsonObjectPreview,
} from './features/jsonObjectBuilder'
import { GlobalNav } from './components/globalNavBar'

function App() {
  const [activeView, setActiveView] = useState<'builder' | 'generator'>(
    'builder'
  )

  type MockJsonDataVerbose = {
    key: string
    value: string
  }

  const [mockJsonData, setMockJsonData] = useState<MockJsonDataVerbose[]>([
    { key: 'id', value: '1' },
  ])

  return (
    <div
      className={clsx(
        'min-h-screen',
        'bg-gradient-to-br',
        'from-indigo-800',
        'via-purple-800',
        'to-pink-700',
        'text-white',
        'flex flex-col items-center',
        'p-4'
      )}
    >
      <h1 className="text-5xl font-bold tracking-tight ">Mock Off</h1>
      <p className="text-sm text-pink-200 italic tracking-wide font-light">
        Mock Off
      </p>

      <p className="text-sm text-pink-200 italic tracking-wide font-light">
        JSON object building & generation
      </p>

      <GlobalNav activeView={activeView} setActiveView={setActiveView} />

      <div className="mt-8 w-full max-w-sm">
        {activeView === 'builder' && (
          <>
            <BuildJsonObject
              mockJsonData={mockJsonData}
              setMockJsonData={setMockJsonData}
            />
            <div className="mt-4">
              <JsonObjectPreview
                mockJsonData={mockJsonData}
                setMockJsonData={setMockJsonData}
              />
            </div>
          </>
        )}

        {activeView === 'generator' && (
          <div className="text-center">
            <p className="text-lg">✨ Generate Mock Data Coming Soon ✨</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
