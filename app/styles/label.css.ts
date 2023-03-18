import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const label = cva([''])

export type LabelStyleProps = VariantProps<typeof label>
