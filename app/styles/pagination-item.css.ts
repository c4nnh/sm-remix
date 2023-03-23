import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const paginationItem = cva([
  'relative inline-flex cursor-pointer items-center justify-center border-2 border-muted-3 bg-transparent px-4 py-2.5 text-sm text-text shadow-sm',
  'hover:text-heading focus:z-10',
  'focus:text-heading focus:outline-none focus:ring-2 focus:ring-blue-400/80 focus:ring-offset-0',
  'disabled:opacity-30 disabled:hover:text-text',
  'dark:focus:ring-white/80',
])

export type PaginationItemStyleProps = VariantProps<typeof paginationItem>
