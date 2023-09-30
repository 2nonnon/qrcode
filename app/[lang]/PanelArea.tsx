'use client'

import React, { useCallback } from 'react'
import { useQrcodeDispatch, useQrcodeOptions } from './QrcodeContext'
import {
  ErrorCorrectionLevelMap,
  MarkerStyleMap,
  PixelStyleMap,
} from '@/components/Qrcode'
import type { NChangeEventHandler } from '@/components/DataInput/type'
import { NInput } from '@/components/DataInput/NInput'
import { NFormItem } from '@/components/DataInput/NForm'
import { NInputNumber } from '@/components/DataInput/NInputNumber'
import { NRadioGroup } from '@/components/DataInput/NRadioGroup'
import { NSelect } from '@/components/DataInput/NSelect'
import { NSlider } from '@/components/DataInput/NSlider'
import { NUpload } from '@/components/DataInput/NUpload'
import throttle from '@/utils/throttle'

const maskPatternOptions = [
  {
    label: 'Auto',
    value: -1,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    label: i,
    value: i,
  })),
]

const versionOptions = Array.from({ length: 40 }).map((_, i) => ({
  label: i + 1,
  value: i + 1,
}))

export default function Panel() {
  const options = useQrcodeOptions()

  const QrcodeDispatch = useQrcodeDispatch()

  const handleChange = useCallback<NChangeEventHandler<any>>(throttle((v, key) => {
    if (key) {
      const value = typeof options[key] === 'number' ? +v : v
      QrcodeDispatch({ type: 'changed', options: { [key]: value } })
    }
  }, 100), [])

  return (
    <form className='flex flex-col gap-3 text-base pb-4'>
      <fieldset className='flex flex-col gap-3 w-full min-w-[auto]'>
        <label className='border border-[var(--border-color)] flex rounded'>
          <NInput name='content' type='textarea' rows={5} value={options.content} onChange={handleChange}></NInput>
        </label>

        <NFormItem name='ErrorCorrectionLevel'>
          <NRadioGroup name='ecc' value={options.ecc} onChange={handleChange} map={ErrorCorrectionLevelMap}></NRadioGroup>
        </NFormItem>

        <NFormItem name='MaskPattern'>
          <NSelect name='maskPattern' value={options.maskPattern} options={maskPatternOptions} onChange={handleChange}></NSelect>
        </NFormItem>

        <NFormItem name='MinVersion'>
          <NSelect name='minVersion' value={options.minVersion} options={versionOptions} onChange={handleChange}></NSelect>
        </NFormItem>

        <NFormItem name='MaxVersion'>
          <NSelect name='maxVersion' value={options.maxVersion} options={versionOptions} onChange={handleChange}></NSelect>
        </NFormItem>

        <NFormItem name='Margin'>
          <div className='flex gap-4 w-full'>
            <NSlider className='flex-1' name='border' min={0} max={25} value={options.border} onChange={handleChange}></NSlider>
            <NInputNumber name='border' min={0} max={25} value={options.border} onChange={handleChange}></NInputNumber>
          </div>
        </NFormItem>
      </fieldset>

      <fieldset className='flex flex-col gap-3 w-full min-w-0'>
        <NFormItem name='PixelSize'>
          <div className='flex gap-4 w-full'>
            <NSlider className='flex-1' name='pixelSize' min={1} max={100} value={options.pixelSize} onChange={handleChange}></NSlider>
            <NInputNumber name='pixelSize' min={1} max={100} value={options.pixelSize} onChange={handleChange}></NInputNumber>
          </div>
        </NFormItem>

        <NFormItem name='PixelStyle'>
          <NRadioGroup name='pixelStyle' value={options.pixelStyle} onChange={handleChange} map={PixelStyleMap}></NRadioGroup>
        </NFormItem>

        <NFormItem name='MarkerStyle'>
          <NRadioGroup name='markerStyle' value={options.markerStyle} onChange={handleChange} map={MarkerStyleMap}></NRadioGroup>
        </NFormItem>

        <NFormItem name='Logo'>
          <NUpload name='logo' value={options.logo} onChange={handleChange} ></NUpload>
        </NFormItem>

        <NFormItem name='Background'>
          <NUpload name='background' value={options.background} onChange={handleChange} ></NUpload>
        </NFormItem>
      </fieldset>
    </form>
  )
}
