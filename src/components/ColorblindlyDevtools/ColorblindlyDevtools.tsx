'use client'

import { CheckIcon, EyeIcon } from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Colorblindly } from '~/components/Colorblindly'
import { ColorblindlyKind } from '~/types'
import { capitalize } from '~/utils'

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

      <div
        style={{
          zIndex: 9999,
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
        }}
      >
        <button
          type="button"
          style={{
            all: 'unset',
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '3rem',
            height: '3rem',
            backgroundColor: 'rgb(15, 110, 240)',
            borderRadius: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
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
          style={{
            display: isVisible ? 'block' : 'none',
            position: 'absolute',
            right: '3rem',
            bottom: '3rem',
            padding: '8px',
            minWidth: '160px',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.25)',
            borderRadius: '8px',
          }}
        >
          <div role="group" style={{ color: 'black' }}>
            {colorblindlyKinds.map((kind) => (
              <div
                key={kind}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                  cursor: 'pointer',
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedKind(kind)
                }}
              >
                <span
                  style={{
                    width: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '8px',
                  }}
                >
                  {kind === selectedKind && (
                    <CheckIcon
                      width={16}
                      height={16}
                      color="rgb(15, 110, 240)"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'black',
                  }}
                >
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
