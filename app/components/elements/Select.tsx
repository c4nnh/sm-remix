import { cx } from 'class-variance-authority'
import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { select, selectOption } from '~/styles'

type Option = {
  value: string
  label: string
}

type Ref = HTMLSelectElement
type Props = SelectHTMLAttributes<Ref> & {
  options?: Option[]
  optionClassName?: string
}

export const Select = forwardRef<Ref, Props>(
  ({ className, optionClassName, options = [], ...props }, ref) => {
    return (
      <select ref={ref} className={cx(select(), className)} {...props}>
        {options.map(({ value, label }) => (
          <option
            key={value}
            value={value}
            className={cx(selectOption(), optionClassName)}
          >
            {label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'
