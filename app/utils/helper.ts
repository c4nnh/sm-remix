type Props = {
  min?: number
  max?: number
}

export const getErrorMessage = (props?: Props) => {
  const { min, max } = props || {}

  return {
    notEmpty: 'Please fill this field',
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
