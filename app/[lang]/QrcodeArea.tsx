'use client'

import { useCallback, useRef, useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { useQrcodeOptions } from './QrcodeContext'
import { getFileHandle, saveDataToFile } from '@/utils/file'
import type { GenerateQrcodeResult } from '@/components/Qrcode'
import Qrcode from '@/components/Qrcode'
import { downloadByUrl } from '@/utils/downloadFile'

export default function () {
  const target = useRef<HTMLCanvasElement>(null)
  const [result, setResult] = useState<GenerateQrcodeResult>()

  const data = [
    {
      label: 'Size',
      value: result?.size,
    },
    {
      label: 'Mask',
      value: result?.maskPattern,
    },
    {
      label: 'Version',
      value: result?.version,
    },
    {
      label: 'Dimension',
      value: result?.height && result.width ? `${result.height} x ${result.width}` : undefined,
    },
  ]

  const options = useQrcodeOptions()

  const handleDownloadQrcode = useCallback(async () => {
    if (target.current) {
      const canvas = target.current

      try {
        const fileHandle = await getFileHandle({
          create: true,
          opts: {
            suggestedName: 'qrcode.png',
            types: [{
              description: 'Images',
              accept: {
                'image/png': ['.png'],
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/webp': ['.webp'],
              },
            }],
            excludeAcceptAllOption: true,
          },
        }) as FileSystemFileHandle

        const file = await fileHandle.getFile()

        canvas.toBlob(async (blob) => {
          if (blob)
            saveDataToFile({ handle: fileHandle, opts: { type: 'write', data: blob } })
        },
        file.type,
        )
      }
      catch (e) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            await downloadByUrl({ url })
            URL.revokeObjectURL(url)
          }
        },
        )
      }
    }
  }, [])

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <Qrcode {...options} onChange={setResult} ref={target}></Qrcode>

        <div className='flex flex-wrap gap-x-4 gap-y-2'>
          {data.map(item => (
            <div key={item.label} className='flex gap-2'>
              <span>{item.label}:</span>
              <span className='text-[var(--text1)]'>{item.value}</span>
            </div>
          ))}
        </div>

        <button className='flex surface-sm w-full items-center justify-center rounded-lg h-10 gap-2 text-base' onClick={handleDownloadQrcode}>
          <Icon icon="charm:download" />
          Download
        </button>
      </div>
    </>
  )
}
