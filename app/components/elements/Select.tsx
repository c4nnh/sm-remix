import { cx } from 'class-variance-authority'
import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { SelectStyleProps } from '~/styles'
import { select, selectOption } from '~/styles'
import type { SelectOption } from '~/types'

type Ref = HTMLSelectElement
type Props = SelectStyleProps &
  SelectHTMLAttributes<Ref> & {
    options?: SelectOption[]
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
