'use client'

import type { ChangeEventHandler, FC, MouseEventHandler, ReactNode } from 'react'
import React, { useCallback } from 'react'
import { Icon } from '@iconify-icon/react'
import { useQrcodeDispatch, useQrcodeOptions } from './QrcodeContext'
import { ErrorCorrectionLevelMap, MarkerStyleMap, PixelStyleMap } from '@/components/Qrcode'

interface FormItemProps { name: string; children: ReactNode }

const FormItem: FC<FormItemProps> = ({ name, children }) => {
  // React.Children.map(children, (child) => {
  //   if (React.isValidElement(child))
  //     return React.cloneElement(child, { })
  // })

  return (
    <div className='flex gap-2 items-center max-sm:flex-col max-sm:items-start'>
      <div className='w-48'><label htmlFor={name}>{name}:</label></div>
      <div className='flex-1 flex min-w-0 w-full'>
        {children}
      </div>
    </div>
  )
}

interface NRadioGroupProps {
  name: string
  value: string
  map: object
  onChange: NChangeEventHandler<string>
}

const NRadioGroup: FC<NRadioGroupProps> = ({ name, onChange, value, map }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <div className='surface-sm__inert w-fit rounded flex overflow-hidden'>
      {Object.entries(map).map(item =>
        <div className='border-r last:border-none border-[var(--border-color)]' key={item[0]}>
          <input data-key={name} id={item[1]} className='peer hidden' type="radio" name={name} value={item[0]} onChange={handleChange} checked={value === item[0]}></input>
          <label htmlFor={item[1]} className='peer-checked:surface-sm__active px-2 py-1 flex cursor-pointer'>{item[1]}</label>
        </div>)}
    </div>
  </>)
}

type NChangeEventHandler<T> = (value: T | undefined, key?: string) => void

interface NUploadProps {
  name?: string
  label?: string
  value?: File
  onChange: NChangeEventHandler<File>
}

const NUpload: FC<NUploadProps> = ({ name, value, label, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.files?.[0],
      name,
    )
  }, [onChange, name])

  const handleClear: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onChange(
      undefined,
      name,
    )
  }, [onChange, name])

  return (<>
    <div className='flex items-center gap-2 min-w-0'>
      <label className='surface-sm flex items-center justify-center w-fit rounded px-4 py-1 gap-2 cursor-pointer'>
        <input data-key={name} className='hidden' type="file" accept='image/*' onChange={handleChange}/>
        <Icon icon="mingcute:upload-2-line" />
        <span>{ label || 'Upload' }</span>
      </label>
      {
        value && <div className='flex items-center gap-2 min-w-0'>
          <p className='overflow-hidden text-ellipsis' title={value.name}>{value.name}</p>
          <button data-key={name} type='button' className='flex text-xl' onClick={handleClear}><Icon icon="jam:close-circle-f" /></button>
        </div>
      }
    </div>
  </>)
}

interface NInputProps {
  name?: string
  value?: string
  onChange: NChangeEventHandler<string>
  type?: 'input' | 'textarea'
  rows?: number
}

const NInput: FC<NInputProps> = ({ name, value, type = 'input', rows, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    {
      type === 'textarea'
        ? <textarea className='w-full rounded px-4 py-2' rows={rows} value={value} onChange={handleChange}></textarea>
        : <input className='w-full rounded px-4 py-2' value={value} onChange={handleChange}/>
    }
  </>)
}

interface NSelectProps<T = string | number> {
  name?: string
  value?: T
  onChange: NChangeEventHandler<T>
  options: Array<{
    label: T
    value: T
  }>
}

const NSelect: FC<NSelectProps> = ({ name, value, onChange, options }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <select className='border border-[var(--border-color)] rounded w-32' value={value} onChange={handleChange}>
      {options.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}
    </select>
  </>)
}

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

interface NSliderProps {
  className?: string
  name?: string
  value?: string | number
  onChange: NChangeEventHandler<string>
  min?: number
  max?: number
}

const NSlider: FC<NSliderProps> = ({ className, name, value, min, max, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <input className={className} type="range" min={min} max={max} value={value} onChange={handleChange}/>
  </>)
}

interface NInputNumberProps {
  className?: string
  name?: string
  value?: number
  onChange: NChangeEventHandler<number>
  min?: number
  max?: number
}

const NInputNumber: FC<NInputNumberProps> = ({ className, name, value, min, max, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange(
      +e.target.value,
      name,
    )
  }, [onChange, name])

  return (<>
    <input className={`border border-[var(--border-color)] rounded w-16 pl-1 ${className}`} type="number" min={min} max={max} value={value} onChange={handleChange}/>
  </>)
}

export default function Panel() {
  const options = useQrcodeOptions()

  const QrcodeDispatch = useQrcodeDispatch()

  const handleChange2 = useCallback<NChangeEventHandler<any>>((v, key) => {
    if (key) {
      const value = typeof options[key] === 'number' ? +v : v
      QrcodeDispatch({ type: 'changed', options: { [key]: value } })
    }
  }, [])

  return (
    <form className='flex flex-col gap-3 text-base pb-4'>
      <fieldset className='flex flex-col gap-3 w-full min-w-[auto]'>
        <label className='border border-[var(--border-color)] flex rounded'>
          <NInput name='content' type='textarea' rows={5} value={options.content} onChange={handleChange2}></NInput>
        </label>

        <FormItem name='ErrorCorrectionLevel'>
          <NRadioGroup name='ecc' value={options.ecc} onChange={handleChange2} map={ErrorCorrectionLevelMap}></NRadioGroup>
        </FormItem>

        <FormItem name='MaskPattern'>
          <NSelect name='maskPattern' value={options.maskPattern} options={maskPatternOptions} onChange={handleChange2}></NSelect>
        </FormItem>

        <FormItem name='MinVersion'>
          <NSelect name='minVersion' value={options.minVersion} options={versionOptions} onChange={handleChange2}></NSelect>
        </FormItem>

        <FormItem name='MaxVersion'>
          <NSelect name='maxVersion' value={options.maxVersion} options={versionOptions} onChange={handleChange2}></NSelect>
        </FormItem>

        <FormItem name='Margin'>
          <div className='flex gap-4 w-full'>
            <NSlider className='flex-1' name='border' min={0} max={25} value={options.border} onChange={handleChange2}></NSlider>
            <NInputNumber name='border' min={0} max={25} value={options.border} onChange={handleChange2}></NInputNumber>
          </div>
        </FormItem>
      </fieldset>

      <fieldset className='flex flex-col gap-3 w-full min-w-0'>
        <FormItem name='PixelSize'>
          <div className='flex gap-4 w-full'>
            <NSlider className='flex-1' name='pixelSize' min={1} max={100} value={options.pixelSize} onChange={handleChange2}></NSlider>
            <NInputNumber name='pixelSize' min={1} max={100} value={options.pixelSize} onChange={handleChange2}></NInputNumber>
          </div>
        </FormItem>

        <FormItem name='PixelStyle'>
          <NRadioGroup name='pixelStyle' value={options.pixelStyle} onChange={handleChange2} map={PixelStyleMap}></NRadioGroup>
        </FormItem>

        <FormItem name='MarkerStyle'>
          <NRadioGroup name='markerStyle' value={options.markerStyle} onChange={handleChange2} map={MarkerStyleMap}></NRadioGroup>
        </FormItem>

        <FormItem name='Logo'>
          <NUpload name='logo' value={options.logo} onChange={handleChange2} ></NUpload>
        </FormItem>

        <FormItem name='Background'>
          <NUpload name='background' value={options.background} onChange={handleChange2} ></NUpload>
        </FormItem>
      </fieldset>
    </form>
  )
}
