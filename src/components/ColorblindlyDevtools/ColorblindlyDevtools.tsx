'use client'

import { ReactNode, useState } from 'react'
import { ColorblindlyKind } from '../../types'
import { Colorblindly } from '../Colorblindly'
import './ColorblindlyDevtools.css'
import { Popover } from './components/Popover'

export interface ColorblindlyDevtoolsOptions {
  children: ReactNode
}

export function ColorblindlyDevtools({
  children,
}: ColorblindlyDevtoolsOptions) {
  const [selectedKind, setSelectedKind] =
    useState<ColorblindlyKind>('trichromacy')

  return (
    <div className="react-colorblindly-devtools__root">
      <Colorblindly kind={selectedKind}>{children}</Colorblindly>
      <Popover selectedKind={selectedKind} setSelectedKind={setSelectedKind} />
    </div>
  )
}
