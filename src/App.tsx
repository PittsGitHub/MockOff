import clsx from 'clsx'
import { JsonObject } from './types/jsonTypes'
import { useState } from 'react'
import {
  BuildJsonObject,
  JsonObjectProperties,
} from './features/jsonPayloadBuilder'
import { GenerateJsonObjects } from './features/jsonMockGenerator'
import { GlobalNav } from './components/globalNavBar'
import { JsonPayloadExport } from './components/globalJsonPayloadExport'

function App() {
  const [activeView, setActiveView] = useState<'builder' | 'generator'>(
    'builder'
  )

  const [jsonObject, setJsonObject] = useState<JsonObject>({ id: 1 })

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
      <div className=" mt-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight ">Mock Off</h1>

        <p className="text-sm text-pink-200 italic tracking-wide ">
          Build & Mock JSON payloads
        </p>
      </div>
      <GlobalNav activeView={activeView} setActiveView={setActiveView} />

      <div className="mt-4 w-full max-w-sm">
        {activeView === 'builder' && (
          <>
            <BuildJsonObject
              jsonObject={jsonObject}
              setJsonObject={setJsonObject}
            />
            <div className="mt-4">
              <JsonObjectProperties
                jsonObject={jsonObject}
                setJsonObject={setJsonObject}
              />
            </div>
            <div>
              <JsonPayloadExport jsonObject={jsonObject} />
            </div>
          </>
        )}

        {activeView === 'generator' && (
          <>
            <GenerateJsonObjects jsonObject={jsonObject} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
