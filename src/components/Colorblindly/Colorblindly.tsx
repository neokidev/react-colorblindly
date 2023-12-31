import { ReactNode } from 'react'
import { ColorblindlyKind } from '../../types'
import { filterMatrixValues, randomId } from '../../utils'

export interface ColorblindlyProps {
  children: ReactNode
  kind: ColorblindlyKind
}

export function Colorblindly({ children, kind }: ColorblindlyProps) {
  const filterId = `react-colorblindly__${randomId()}`

  return (
    <>
      {kind !== 'trichromacy' && (
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
