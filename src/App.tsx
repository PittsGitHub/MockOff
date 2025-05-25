import clsx from 'clsx'
import { JsonObject } from './types/jsonTypes'
import { useState } from 'react'
import {
  BuildJsonObject,
  JsonObjectProperties,
} from './features/jsonObjectBuilder'
import { GenerateJsonObjects } from './features/jsonPayloadGenerator'
import { GlobalNav } from './components/globalNavBar'
import { JsonObjectExport } from './components/globalFlatJsonObjectExport'
import { JsonPayloadExport } from './components/globalEnvelopFlatJsonObjectPayloadExport'

function App() {
  const [activeView, setActiveView] = useState<'builder' | 'generator'>(
    'builder'
  )
  const [jsonObject, setJsonObject] = useState<JsonObject>({ id: 1 })
  const [numberOfPayloads, setNumberOfPayloads] = useState<number>(1)
  const [numberOfObjects, setNumberOfObjects] = useState<number>(1)
  const [exportPayloadReady, setExportPayloadReady] = useState<boolean>(false)

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
      <div className=" mt-8 text-center content-center">
        <h1 className="text-5xl font-bold tracking-tight ">Mock Off</h1>

        <p className="text-sm text-pink-200 italic tracking-wide ">
          Build & Mock Flat Normalised JSON objects and payloads
        </p>
      </div>
      <GlobalNav activeView={activeView} setActiveView={setActiveView} />

      <div className="mt-2 w-full max-w-sm">
        {activeView === 'builder' && (
          <>
            {/* <p className="text-sm text-center text-pink-200 italic tracking-wide mb-4">
              Build or Edit a flat JSON object
            </p> */}
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
              <JsonObjectExport jsonObject={jsonObject} />
            </div>
          </>
        )}

        {activeView === 'generator' && (
          <>
            {/* <p className="text-sm text-center text-pink-200 italic tracking-wide mb-4">
              Generate a enveloped payloads <br />
              Containing flat json objects <br />
              With object properties generated
            </p> */}
            <GenerateJsonObjects
              jsonObject={jsonObject}
              numberOfObjects={numberOfObjects}
              setNumberOfObjects={setNumberOfObjects}
              numberOfPayloads={numberOfPayloads}
              setNumberOfPayloads={setNumberOfPayloads}
              setExportPayloadReady={setExportPayloadReady}
            />
            <JsonPayloadExport
              jsonObject={jsonObject}
              numberOfObjects={numberOfObjects}
              numberOfPayloads={numberOfPayloads}
              exportPayloadReady={exportPayloadReady}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
