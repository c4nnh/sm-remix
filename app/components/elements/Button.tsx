import { cx } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { ButtonStyleProps } from '~/styles'
import { button } from '~/styles'

type Ref = HTMLButtonElement
type Props = ButtonStyleProps & ButtonHTMLAttributes<Ref>

export const Button = forwardRef<Ref, Props>(
  ({ className, buttonType = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          button({
            buttonType,
          }),
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
