import { cx } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { button } from '~/styles'

type Ref = HTMLButtonElement
type Props = ButtonHTMLAttributes<Ref>

export const Button = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return <button ref={ref} className={cx(button(), className)} {...props} />
})

Button.displayName = 'Button'
