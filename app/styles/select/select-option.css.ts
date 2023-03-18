import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const selectOption = cva(['bg-layer-3'])

export type SelectOptionStyleProps = VariantProps<typeof selectOption>
