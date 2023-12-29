'use client'

import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { CheckIcon, EyeIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { ColorblindlyKind } from '../../types'
import { capitalize } from '../../utils'
import { Colorblindly } from '../Colorblindly'
import './ColorblindlyDevtools.css'

const colorblindlyKinds: ColorblindlyKind[] = [
  'normal',
  'achromatomaly',
  'achromatopsia',
  'deuteranomaly',
  'deuteranopia',
  'protanomaly',
  'protanopia',
  'tritanomaly',
  'tritanopia',
]

export interface ColorblindlyDevtoolsOptions {
  children: ReactNode
}

export function ColorblindlyDevtools({
  children,
}: ColorblindlyDevtoolsOptions) {
  const [selectedKind, setSelectedKind] = useState<ColorblindlyKind>('normal')

  return (
    <div className="react-colorblindly-devtools__root">
      <Colorblindly kind={selectedKind}>{children}</Colorblindly>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="react-colorblindly-devtools__popover-button"
          >
            <EyeIcon width={32} height={32} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="react-colorblindly-devtools__popover-content"
            sideOffset={5}
          >
            <RadioGroup.Root
              defaultValue={colorblindlyKinds[0]}
              aria-label="View density"
              onValueChange={(value) =>
                setSelectedKind(value as ColorblindlyKind)
              }
            >
              {colorblindlyKinds.map((kind) => (
                <div
                  key={kind}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <RadioGroup.Item
                    className="react-colorblindly-devtools__popover-item"
                    value={kind}
                    id={kind}
                  >
                    <RadioGroup.Indicator className="react-colorblindly-devtools__popover-item-icon">
                      <CheckIcon color="rgb(15, 110, 240)" strokeWidth={3} />
                    </RadioGroup.Indicator>
                    <span className="react-colorblindly-devtools__popover-item-label">
                      {capitalize(kind)}
                    </span>
                  </RadioGroup.Item>
                </div>
              ))}
            </RadioGroup.Root>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
