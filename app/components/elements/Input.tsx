import { cx } from 'class-variance-authority'
import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type Ref = HTMLInputElement
type Props = InputHTMLAttributes<Ref>

export const Input = forwardRef<Ref, Props>(
  ({ className, ...delegated }, ref) => {
    return (
      <input
        ref={ref}
        className={cx([
          'mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm',
          className,
        ])}
        {...delegated}
      />
    )
  }
)

Input.displayName = 'Input'
Input.defaultProps = {
  type: 'text',
}
