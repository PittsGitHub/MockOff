import { useState } from 'react'
import { JsonObject } from '../../types/jsonTypes'
import {
  sharedInputLabelProps,
  sharedInputProps,
} from '../../styles/input.style'
import {
  sharedButtonBaseClass,
  buttonVariantCopied,
  buttonVariantDefault,
} from '../../styles/button.style'

import { generateMockObjects } from '../../services/mockData.service'
import { buildFlatJsonRequestObject } from '../../services/buildJsonPayload.service'

import clsx from 'clsx'
interface Props {
  jsonObject: JsonObject
  numberOfPayloads: number
  setNumberOfPayloads: (numberOfPayloads: number) => void
  numberOfObjectsPerPayload: number
  setNumberOfObjectsPerPayload: (numberOfPayloads: number) => void
  setExportPayloadReady: (exportPayloadReady: boolean) => void
  setMockedJsonObjects: (setMockedJsonObjects: JsonObject[]) => void
}

const numberClamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export const GenerateJsonObjects = ({
  jsonObject,
  numberOfPayloads,
  setNumberOfPayloads,
  numberOfObjectsPerPayload,
  setNumberOfObjectsPerPayload,
  setExportPayloadReady,
  setMockedJsonObjects,
}: Props) => {
  const [generateMockDataOnClick, setGenerateMockDataOnClick] = useState(false)

  const generateMockData = async () => {
    const typesInferedObject = buildFlatJsonRequestObject(jsonObject)
    const mockJsonObjects: JsonObject[] = generateMockObjects(
      typesInferedObject,
      numberOfObjectsPerPayload * numberOfPayloads
    )
    setMockedJsonObjects(mockJsonObjects)
  }

  return (
    <div className="flex flex-col space-y-2 w-full max-w-sm">
      {/* <p className="text-lg text-center text-pink-100">
        ✨ Generate Mock Data ✨
      </p> */}
      <div className="flex flex-col w-full max-w-sm">
        <div className="mt-2 grid grid-cols-2 gap-1 w-full max-w-sm">
          <label {...sharedInputLabelProps}>Payloads</label>
          <label {...sharedInputLabelProps}>Objects</label>

          <input
            {...sharedInputProps}
            value={numberOfPayloads}
            onChange={(e) => {
              const minPayloads = 1
              const maxPayloads = 1000
              const inputPayloadValue = Number(e.target.value)
              const clampedValue = numberClamp(
                inputPayloadValue,
                minPayloads,
                maxPayloads
              )
              setNumberOfPayloads(clampedValue)
              setExportPayloadReady(false)
            }}
          />
          <input
            {...sharedInputProps}
            value={numberOfObjectsPerPayload}
            onChange={(e) => {
              const minObjects = 1
              const maxObjects = 250
              const inputObjectValue = Number(e.target.value)
              const clampedValue = numberClamp(
                inputObjectValue,
                minObjects,
                maxObjects
              )
              setNumberOfObjectsPerPayload(clampedValue)
              setExportPayloadReady(false)
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={async () => {
          setGenerateMockDataOnClick(true) // show "generating..."
          setExportPayloadReady(false) // disable export buttons

          await generateMockData() // this may take 1-2s with large payloads

          setExportPayloadReady(true) // enable export buttons
          setGenerateMockDataOnClick(false) // reset button text
        }}
        className={clsx(
          sharedButtonBaseClass,
          generateMockDataOnClick ? buttonVariantCopied : buttonVariantDefault
        )}
      >
        {generateMockDataOnClick
          ? 'Mock data generating...'
          : 'Generate mock data'}
      </button>
    </div>
  )
}
