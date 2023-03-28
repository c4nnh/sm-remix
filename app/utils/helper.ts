import { dayjs } from '~/libs'

type Props = {
  min?: number
  max?: number
}

export const getErrorMessage = (props?: Props) => {
  const { min, max } = props || {}

  return {
    notEmpty: 'Please fill this field',
    mustSelect: 'Please select at least 1 item',
    isEmail: 'Please enter valid email',
    minLength: `This field must contains at least ${min} character(s)`,
    maxLength: `This field must contains at most ${max} character(s)`,
    min: `This field must be greater than or equal ${min}`,
    max: `This field must be less than or equal ${max}`,
  }
}

export const isTwoObjectEqual = (
  first: Record<string, any> = {},
  second: Record<string, any> = {},
  fields?: string[]
) => {
  const compareFields = fields || Object.keys(first)

  return compareFields.every(key => first[key] === second[key])
}

export const checkDateDuration = ({
  from,
  to,
}: {
  from?: Date | null
  to?: Date | null
}) => {
  if (!from || !to) return true

  const fromDate = dayjs(from)
  const toDate = dayjs(to)

  return fromDate.isSame(toDate) || fromDate.isBefore(toDate)
}
