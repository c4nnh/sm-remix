import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const tag = cva(
  [
    'inline-flex items-center rounded-full border-2 px-2 py-0.5 text-sm font-semibold shadow-sm',
    'hover:cursor-pointer',
  ],
  {
    variants: {
      type: {
        danger: 'border-red-200 bg-red-200 text-red-600',
        warning: 'border-orange-200 bg-orange-200 text-orange-600',
        success: 'border-green-200 bg-green-200 text-green-600',
        default: 'border-gray-200 bg-gray-200 text-gray-600',
        primary: 'border-blue-200 bg-blue-200 text-blue-600',
      },
      iconPosition: {
        leading: 'ml-1',
        trailing: 'mr-1',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  }
)

export type TagStyleProps = VariantProps<typeof tag>
