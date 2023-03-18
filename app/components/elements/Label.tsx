import { cx } from 'class-variance-authority'
import type { LabelHTMLAttributes } from 'react'
import { forwardRef } from 'react'

type Ref = HTMLLabelElement
type Props = LabelHTMLAttributes<Ref>

export const Label = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cx('block text-sm font-semibold text-heading', className)}
      {...props}
    />
  )
})

Label.displayName = 'Label'
