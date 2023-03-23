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
import type { SomeZodObject } from 'zod'
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
  ...props
}: FormProps<Schema> & { fieldClassName?: string }) => {
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
        const { name, errors } = props
        return (
          <Field key={String(name)} {...props}>
            {({ Label, SmartInput, Errors }) => (
              <>
                <Label />
                <SmartInput
                  // @ts-ignore
                  hasError={Boolean(errors)}
                />
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
