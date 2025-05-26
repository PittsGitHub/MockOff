import clsx from 'clsx'
import { useState } from 'react'
import { JsonObject, JsonPayload } from '../types/jsonTypes'
import { chunkArray } from '../services/buildJsonPayload.service'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import {
  sharedButtonBaseClass,
  buttonVariantCopied,
  buttonVariantDefault,
  buttonVariantDisabled,
} from '../styles/button.style'

interface Props {
  numberOfPayloads: number
  numberOfObjectsPerPayload: number
  exportPayloadReady: boolean
  mockedJsonObjects: JsonObject[]
}
export const JsonPayloadExport = ({
  numberOfObjectsPerPayload,
  exportPayloadReady,
  mockedJsonObjects,
}: Props) => {
  const [copiedFirst, setCopiedFirst] = useState(false)
  const [exportedFirst, setExportedFirst] = useState(false)
  const [exported, setExported] = useState(false)

  const payloadChunks = chunkArray(mockedJsonObjects, numberOfObjectsPerPayload)

  const totalObjects = mockedJsonObjects.length

  const exportDataLots: JsonPayload[] = payloadChunks.map((chunk) => ({
    totalItemCount: totalObjects,
    items: chunk,
  }))

  const handleExport = async () => {
    const zip = new JSZip()

    exportDataLots.forEach((payload, index) => {
      const filename = `mockoff-data-${index + 1}.json`
      zip.file(filename, JSON.stringify(payload, null, 2))
    })

    const blob = await zip.generateAsync({ type: 'blob' })

    saveAs(blob, 'mockoff-export.zip')

    setExported(true)
    setTimeout(() => setExported(false), 500)
  }

  const handleExportFirstItem = () => {
    const blob = new Blob([JSON.stringify(exportDataLots[0], null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mockoff-data-${1}.json`
    a.click()
    URL.revokeObjectURL(url)

    setExportedFirst(true)
    setTimeout(() => setExportedFirst(false), 500)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(exportDataLots[0], null, 2)
      )
      console.log('Copied to clipboard!')
      setCopiedFirst(true)
      setTimeout(() => setCopiedFirst(false), 500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div
      className="mt-4 flex flex-row justify-center space-x-2 w-full max-w-sm"
      title={!exportPayloadReady ? 'Generate mock data first' : ''}
    >
      <button
        type="button"
        onClick={handleExportFirstItem}
        disabled={!exportPayloadReady}
        className={clsx(
          sharedButtonBaseClass,
          !exportPayloadReady
            ? buttonVariantDisabled
            : exportedFirst
              ? buttonVariantCopied
              : buttonVariantDefault
        )}
      >
        {exportedFirst ? 'Exported first payload!' : 'Export first payload'}
      </button>
      <button
        type="button"
        onClick={handleExport}
        disabled={!exportPayloadReady}
        className={clsx(
          sharedButtonBaseClass,
          !exportPayloadReady
            ? buttonVariantDisabled
            : exported
              ? buttonVariantCopied
              : buttonVariantDefault
        )}
      >
        {exported ? 'Exported all payloads!' : 'Export all payloads'}
      </button>

      <button
        type="button"
        onClick={handleCopy}
        disabled={!exportPayloadReady}
        className={clsx(
          sharedButtonBaseClass,
          !exportPayloadReady
            ? buttonVariantDisabled
            : copiedFirst
              ? buttonVariantCopied
              : buttonVariantDefault
        )}
      >
        {copiedFirst ? 'Copied first payload!' : 'Copy first payload'}
      </button>
    </div>
  )
}
