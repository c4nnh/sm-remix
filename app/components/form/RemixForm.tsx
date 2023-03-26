import {
  Form as FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit,
} from '@remix-run/react'
import { cx } from 'class-variance-authority'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
} from 'react'
import type { FormProps } from 'remix-forms'
import { createForm } from 'remix-forms'
import type { SomeZodObject, z } from 'zod'
import { input } from '~/styles'
import { Button, Input, Label } from '../elements'

const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
})

const FormLabel = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <Label {...props} />
}

const FormButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Button buttonType="primary" {...props} />
}

const FormError = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cx('text-xs font-medium text-red-500', className)}
      {...props}
    />
  )
}

export const RemixForm = <Schema extends SomeZodObject>({
  className,
  fieldClassName,
  readOnlyFields = [],
  ...props
}: FormProps<Schema> & {
  fieldClassName?: string
  readOnlyFields?: Array<keyof z.TypeOf<Schema>>
}) => {
  return (
    <Form
      fieldComponent={fieldProps => {
        return (
          <div
            {...fieldProps}
            className={cx('flex flex-col space-y-2', fieldClassName)}
          />
        )
      }}
      labelComponent={FormLabel}
      buttonComponent={FormButton}
      inputComponent={Input}
      errorComponent={FormError}
      className={cx('flex flex-col gap-5', className)}
      renderField={({ Field, ...props }) => {
        const { name } = props

        // @ts-ignore
        const inputType = props.type
        return (
          <Field key={String(name)} {...props}>
            {({ Label, SmartInput, Errors }) => (
              <>
                <Label />
                {readOnlyFields.includes(name) ? (
                  <Input readOnly type={inputType} />
                ) : (
                  <SmartInput
                    type={inputType}
                    className={cx(input(), [
                      props.options ? '!bg-layer-3' : '',
                    ])}
                  />
                )}
                <Errors />
              </>
            )}
          </Field>
        )
      }}
      {...props}
    />
  )
}
