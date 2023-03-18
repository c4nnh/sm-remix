import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const button = cva([
  'inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm',
  'hover:border-primary-accent hover:bg-primary-accent',
  'focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:ring-offset-0',
  'disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white',
  'dark:focus:ring-white/80',
])

export type ButtonStyleProps = VariantProps<typeof button>
