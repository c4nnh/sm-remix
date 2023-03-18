type Props = {
  min?: number
  max?: number
}

export const getErrorMessage = (props?: Props) => {
  const { min, max } = props || {}

  return {
    isEmail: 'Please enter valid email',
    minLength: `This field must contains at least ${min} character(s)`,
    maxLength: `This field must contains at most ${max} character(s)`,
  }
}
