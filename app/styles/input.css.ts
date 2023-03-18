import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const input = cva(
  [
    'mt-2 block w-full rounded-xl border-2 border-hr bg-transparent px-4 py-2.5 font-semibold text-heading',
    'placeholder:text-text/50',
    'focus:border-primary focus:outline-none focus:ring-0',
    'sm:text-sm',
  ],
  {
    variants: {
      variant: {
        solid: 'bg-muted-1',
        hollow: 'bg-transparent',
      },
      hasError: {
        true: '',
        false: '',
      },
      hasBlockLeadingAddon: {
        true: 'rounded-l-none',
        false: '',
      },
      hasBlockTrailingAddon: {
        true: 'rounded-r-none',
        false: '',
      },
    },
    compoundVariants: [
      // Hollow
      { variant: 'hollow', hasError: false, class: 'border-muted-3' },
      { variant: 'hollow', hasError: true, class: 'border-red-500' },
      // Solid
      { variant: 'solid', hasError: false, class: 'border-layer-3' },
      { variant: 'solid', hasError: true, class: 'border-red-500' },
    ],
    defaultVariants: {
      variant: 'hollow',
      hasError: false,
      hasBlockLeadingAddon: false,
      hasBlockTrailingAddon: false,
    },
  }
)

export type InputStyleProps = VariantProps<typeof input>
