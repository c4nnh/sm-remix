import { cx } from 'class-variance-authority'
import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { InputStyleProps } from '~/styles'
import { input } from '~/styles'

type Ref = HTMLInputElement
type Props = InputStyleProps & InputHTMLAttributes<Ref>

export const Input = forwardRef<Ref, Props>(
  (
    {
      variant,
      hasError,
      hasBlockLeadingAddon,
      hasBlockTrailingAddon,
      className,
      ...delegated
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={cx([
          input({
            variant,
            hasError,
            hasBlockLeadingAddon,
            hasBlockTrailingAddon,
          }),
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
  variant: 'hollow',
  hasError: false,
  hasBlockLeadingAddon: false,
  hasBlockTrailingAddon: false,
}
