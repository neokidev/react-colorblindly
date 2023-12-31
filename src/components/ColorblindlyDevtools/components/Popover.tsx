import * as PopoverPrimitive from '@radix-ui/react-popover'
import DestyleCSS from '@react-scoped-css-reset/destyle'
import { ColorblindlyKind } from '../../../types'
import { EyeIcon } from './EyeIcon'
import { RadioGroup } from './RadioGroup'

interface PopoverProps {
  selectedKind: ColorblindlyKind
  setSelectedKind: (kind: ColorblindlyKind) => void
}

export function Popover({ selectedKind, setSelectedKind }: PopoverProps) {
  return (
    <PopoverPrimitive.Root>
      <DestyleCSS>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className="react-colorblindly-devtools__popover-button"
          >
            <EyeIcon className="react-colorblindly-devtools__popover-button-icon" />
          </button>
        </PopoverPrimitive.Trigger>
      </DestyleCSS>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="react-colorblindly-devtools__popover-content"
          sideOffset={5}
        >
          <DestyleCSS>
            <RadioGroup
              selectedKind={selectedKind}
              setSelectedKind={setSelectedKind}
            />
          </DestyleCSS>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
