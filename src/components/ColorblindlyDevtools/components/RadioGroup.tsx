import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { ColorblindlyKind } from '../../../types'
import { RadioGroupItem } from './RadioGroupItem'

interface ColorblindlyItem {
  kind: ColorblindlyKind
  description: string
}

const colorblindlyItems: ColorblindlyItem[] = [
  {
    kind: 'trichromacy',
    description: 'Normal',
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

interface RadioGroupProps {
  selectedKind: ColorblindlyKind
  setSelectedKind: (kind: ColorblindlyKind) => void
}

export function RadioGroup({ selectedKind, setSelectedKind }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      defaultValue={selectedKind}
      aria-label="View colorblindly"
      onValueChange={(value) => setSelectedKind(value as ColorblindlyKind)}
    >
      {colorblindlyItems.map(({ kind, description }) => (
        <RadioGroupItem key={kind} kind={kind} description={description} />
      ))}
    </RadioGroupPrimitive.Root>
  )
}
