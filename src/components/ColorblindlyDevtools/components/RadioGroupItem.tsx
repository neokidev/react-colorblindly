import * as RadioGroup from '@radix-ui/react-radio-group'
import { ColorblindlyKind } from '../../../types'
import { capitalize, filterMatrixValues } from '../../../utils'
import { CheckIcon } from './CheckIcon'

interface RadioGroupItemProps {
  kind: ColorblindlyKind
  description: string
}

export function RadioGroupItem({ kind, description }: RadioGroupItemProps) {
  const filterId = `react-colorblindly-devtools__${kind}`

  return (
    <RadioGroup.Item
      key={kind}
      className="react-colorblindly-devtools__popover-item-wrapper"
      value={kind}
      id={kind}
    >
      <div className="react-colorblindly-devtools__popover-item">
        <div className="react-colorblindly-devtools__popover-preview">
          {kind !== 'trichromacy' && (
            <svg
              style={{
                width: 0,
                height: 0,
                position: 'absolute',
              }}
            >
              <defs>
                <filter id={filterId}>
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
              filter: kind !== 'trichromacy' ? `url(#${filterId})` : undefined,
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
          <CheckIcon />
        </RadioGroup.Indicator>
      </div>
    </RadioGroup.Item>
  )
}
