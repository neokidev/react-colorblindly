'use client'

import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import DestyleCSS from '@react-scoped-css-reset/destyle'
import { ReactNode, useState } from 'react'
import { ColorblindlyKind } from '../../types'
import { capitalize } from '../../utils'
import { Colorblindly } from '../Colorblindly'
import './ColorblindlyDevtools.css'
import { EyeIcon } from './EyeIcon'

const filterMatrixValues: Record<
  Exclude<ColorblindlyKind, 'normal'>,
  string
> = {
  achromatomaly:
    '0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0',
  achromatopsia:
    '0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0',
  deuteranomaly:
    '0.57418,0.42582,-0.00000,0,0 0.17418,0.82582,-0.00000,0,0 -0.01318,0.01318,1.00000,0,0 0,0,0,1,0',
  deuteranopia:
    '0.29031,0.70969,-0.00000,0,0 0.29031,0.70969,-0.00000,0,0 -0.02197,0.02197,1.00000,0,0 0,0,0,1,0',
  protanomaly:
    '0.46533,0.53467,-0.00000,0,0 0.06533,0.93467,0.00000,0,0 0.00268,-0.00268,1.00000,0,0 0,0,0,1,0',
  protanopia:
    '0.10889,0.89111,-0.00000,0,0 0.10889,0.89111,0.00000,0,0 0.00447,-0.00447,1.00000,0,0 0,0,0,1,0',
  tritanomaly:
    '1.00000,0.09142,-0.09142,0,0 0.00000,0.92030,0.07970,0,0 -0.00000,0.52030,0.47970,0,0 0,0,0,1,0',
  tritanopia:
    '1.00000,0.15236,-0.15236,0,0 0.00000,0.86717,0.13283,0,0 -0.00000,0.86717,0.13283,0,0 0,0,0,1,0',
}

interface ColorblindlyItem {
  kind: ColorblindlyKind
  description: string
}

const colorblindlyItems: ColorblindlyItem[] = [
  {
    kind: 'normal',
    description: 'Trichromacy',
  },
  {
    kind: 'achromatomaly',
    description: 'Blue Cone Monochromacy',
  },
  {
    kind: 'achromatopsia',
    description: 'Monochromacy',
  },
  {
    kind: 'deuteranomaly',
    description: 'Green-Weak',
  },
  {
    kind: 'deuteranopia',
    description: 'Green-Blind',
  },
  {
    kind: 'protanomaly',
    description: 'Red-Weak',
  },
  {
    kind: 'protanopia',
    description: 'Red-Blind',
  },
  {
    kind: 'tritanomaly',
    description: 'Blue-Weak',
  },
  {
    kind: 'tritanopia',
    description: 'Blue-Blind',
  },
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
        <DestyleCSS>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="react-colorblindly-devtools__popover-button"
            >
              <EyeIcon className="react-colorblindly-devtools__popover-button-icon" />
            </button>
          </Popover.Trigger>
        </DestyleCSS>
        <Popover.Portal>
          <Popover.Content
            className="react-colorblindly-devtools__popover-content"
            sideOffset={5}
          >
            <DestyleCSS>
              <RadioGroup.Root
                defaultValue={colorblindlyItems[0].kind}
                aria-label="View density"
                onValueChange={(value) =>
                  setSelectedKind(value as ColorblindlyKind)
                }
              >
                {colorblindlyItems.map(({ kind, description }) => (
                  <RadioGroup.Item
                    key={kind}
                    className="react-colorblindly-devtools__popover-item-wrapper"
                    value={kind}
                    id={kind}
                  >
                    <div className="react-colorblindly-devtools__popover-item">
                      <div className="react-colorblindly-devtools__popover-preview">
                        {kind !== 'normal' && (
                          <svg
                            style={{
                              width: 0,
                              height: 0,
                              position: 'absolute',
                            }}
                          >
                            <defs>
                              <filter
                                id={`react-colorblindly-devtools__${kind}`}
                              >
                                <feColorMatrix
                                  type="matrix"
                                  values={filterMatrixValues[kind]}
                                />
                              </filter>
                            </defs>
                          </svg>
                        )}

                        <div
                          className="rainbow-square"
                          style={{
                            filter:
                              kind !== 'normal'
                                ? `url(#react-colorblindly-devtools__${kind})`
                                : undefined,
                          }}
                        />
                      </div>

                      <div className="react-colorblindly-devtools__popover-text-container">
                        <p className="react-colorblindly-devtools__popover-kind">
                          {capitalize(kind)}
                        </p>
                        <p className="react-colorblindly-devtools__popover-description">
                          {description}
                        </p>
                      </div>
                      <RadioGroup.Indicator className="react-colorblindly-devtools__popover-item-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          width="1.5rem"
                          height="1.5rem"
                        >
                          <circle
                            cx={12}
                            cy={12}
                            r={12}
                            fill="rgb(15, 110, 240)"
                          />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="#fff"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </RadioGroup.Indicator>
                    </div>
                  </RadioGroup.Item>
                ))}
              </RadioGroup.Root>
            </DestyleCSS>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
