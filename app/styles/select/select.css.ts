import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const select = cva([
  'mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent py-2.5 pl-4 pr-8 font-medium text-text',
  'focus:border-primary',
  'disabled:opacity-30 sm:text-sm',
])

export type SelectStyleProps = VariantProps<typeof select>
