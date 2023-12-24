'use client'

import { CheckIcon, EyeIcon } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Colorblindly } from '~/components/Colorblindly'
import { ColorblindlyKind } from '~/types'
import { capitalize } from '~/utils'
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
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    function closePopover() {
      if (isVisibleRef.current) {
        setIsVisible(false)
        isVisibleRef.current = false
      }
    }

    window.addEventListener('click', closePopover)
    return () => window.removeEventListener('click', closePopover)
  }, [])

  return (
    <>
      <Colorblindly kind={selectedKind}>{children}</Colorblindly>

      <div className="react-colorblindly-devtolls__dropdown-menu-root">
        <button
          type="button"
          className="react-colorblindly-devtolls__dropdown-menu-button"
          onClick={(event) => {
            event.stopPropagation()
            setIsVisible(!isVisible)
            isVisibleRef.current = !isVisibleRef.current
          }}
        >
          <EyeIcon width={32} height={32} />
        </button>
        <div
          onClick={(event) => event.stopPropagation()}
          className="react-colorblindly-devtolls__dropdown-menu-content"
          data-state={isVisible ? 'open' : 'closed'}
        >
          <div role="group">
            {colorblindlyKinds.map((kind) => (
              <div
                key={kind}
                role="menuitem"
                className="react-colorblindly-devtolls__dropdown-menu-item"
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedKind(kind)
                }}
              >
                <span className="react-colorblindly-devtolls__dropdown-menu-item-icon">
                  {kind === selectedKind && (
                    <CheckIcon
                      width={16}
                      height={16}
                      color="rgb(15, 110, 240)"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span className="react-colorblindly-devtolls__dropdown-menu-item-label">
                  {capitalize(kind)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
