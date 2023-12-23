import { ReactNode } from 'react'
import { ColorblindlyKind } from '~/types'
import { randomId } from '~/utils'

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

export interface ColorblindlyProps {
  children: ReactNode
  kind: ColorblindlyKind
}

export function Colorblindly({ children, kind }: ColorblindlyProps) {
  const filterId = randomId()

  return (
    <>
      {kind !== 'normal' && (
        <svg style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs>
            <filter id={filterId}>
              <feColorMatrix type="matrix" values={filterMatrixValues[kind]} />
            </filter>
          </defs>
        </svg>
      )}
      <div style={{ filter: `url(#${filterId})` }}>{children}</div>
    </>
  )
}
