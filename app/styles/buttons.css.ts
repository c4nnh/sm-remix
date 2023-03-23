import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const button = cva(
  [
    'inline-flex cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-2.5 text-sm font-semibold shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:opacity-30 disabled:hover:text-white',
    'dark:focus:ring-white/80',
  ],
  {
    variants: {
      buttonType: {
        primary: [
          'border-primary bg-primary text-white',
          'hover:border-primary-accent hover:bg-primary-accent',
          'focus:ring-blue-400/80',
          'disabled:hover:border-primary disabled:hover:bg-primary',
        ],
        danger: [
          'border-red-600 bg-red-600 text-white',
          'hover:border-red-500 hover:bg-red-500',
          'focus:ring-red-400/80',
          'disabled:hover:border-red-600 disabled:hover:bg-red-600',
        ],
        default: [
          'border-gray-300 bg-gray-300 text-black',
          'hover:border-gray-200 hover:bg-gray-200',
          'focus:ring-gray-200/80',
          'disabled:hover:border-gray-400 disabled:hover:bg-gray-300',
        ],
      },
    },
  }
)

export type ButtonStyleProps = VariantProps<typeof button>
