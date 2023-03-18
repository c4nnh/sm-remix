import { cx } from 'class-variance-authority'
import type { LabelHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { label } from '~/styles'

type Ref = HTMLLabelElement
type Props = LabelHTMLAttributes<Ref>

export const Label = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cx(label(), className)} {...props} />
})

Label.displayName = 'Label'
