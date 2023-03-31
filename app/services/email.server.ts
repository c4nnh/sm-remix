import { ServerClient } from 'postmark'
import type {
  AutoPayFailedTemplateModel,
  AutoPayReminderTemplateModel,
  AutoPaySuccessTemplateModel,
  ConfirmEmailTemplateModel,
  ExtendSubscriptionReminderTemplateModel,
  PostmarkTemplateMessage,
  ResetPasswordTempalteModel,
} from '~/types'
import {
  NODE_ENV,
  POSTMARK_API_KEY,
  POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID,
  POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID,
  POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID,
  POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
  POSTMARK_EMAIL_FROM_ADDRESS,
  POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID,
  POSTMARK_MESSAGE_STREAM,
  POSTMARK_RESET_PASSWORD_TEMPLATE_ID,
  PRODUCT_NAME,
  PRODUCT_URL,
} from './env'

const client = new ServerClient(POSTMARK_API_KEY)

export const sendConfirmEmail = ({
  to,
  template,
}: PostmarkTemplateMessage<ConfirmEmailTemplateModel>) => {
  if (NODE_ENV === 'development') {
    console.log('---')
    console.log('Email Confirmation:')
    console.log(JSON.stringify(template, null, 2))
    console.log('---')
  }

  if (NODE_ENV === 'test') {
    try {
      return client.sendEmailWithTemplate({
        MessageStream: POSTMARK_MESSAGE_STREAM,
        From: POSTMARK_EMAIL_FROM_ADDRESS,
        To: to,
        TemplateId: +POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
        TemplateModel: {
          ...template,
          productName: PRODUCT_NAME,
          productUrl: PRODUCT_URL,
        },
      })
    } catch (e) {
      console.log(e)
      // do nothing
    }
  }
}

export const sendResetPassword = ({
  to,
  template,
}: PostmarkTemplateMessage<ResetPasswordTempalteModel>) => {
  if (NODE_ENV !== 'production') {
    console.log('---')
    console.log('Email Reset Password:')
    console.log(JSON.stringify(template, null, 2))
    console.log('---')
  }

  if (NODE_ENV === 'production') {
    try {
      return client.sendEmailWithTemplate({
        MessageStream: POSTMARK_MESSAGE_STREAM,
        From: POSTMARK_EMAIL_FROM_ADDRESS,
        To: to,
        TemplateId: +POSTMARK_RESET_PASSWORD_TEMPLATE_ID,
        TemplateModel: {
          ...template,
          productName: PRODUCT_NAME,
          productUrl: PRODUCT_URL,
        },
      })
    } catch (e) {
      console.log(e)
      // do nothing
    }
  }
}

export const sendExtendSubscriptionReminder = (
  messages: PostmarkTemplateMessage<ExtendSubscriptionReminderTemplateModel>[]
) => {
  if (NODE_ENV === 'development') {
    console.log('---')
    console.log('Email Extend Subscription Reminder:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV === 'test') {
    sendEmailBatchWithTemplates(
      +POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID,
      messages
    )
  }
}

export const sendAutoPayReminder = (
  messages: PostmarkTemplateMessage<AutoPayReminderTemplateModel>[]
) => {
  if (NODE_ENV === 'development') {
    console.log('---')
    console.log('Email Auto Pay Reminder:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV === 'test') {
    sendEmailBatchWithTemplates(
      +POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID,
      messages
    )
  }
}

export const sendAutoPaySuccess = (
  messages: PostmarkTemplateMessage<AutoPaySuccessTemplateModel>[]
) => {
  if (NODE_ENV === 'development') {
    console.log('---')
    console.log('Email Auto Pay Success:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV === 'test') {
    sendEmailBatchWithTemplates(
      +POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID,
      messages
    )
  }
}

export const sendAutoPayFailed = (
  messages: PostmarkTemplateMessage<AutoPayFailedTemplateModel>[]
) => {
  if (NODE_ENV === 'development') {
    console.log('---')
    console.log('Email Auto Pay Failed:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV === 'test') {
    sendEmailBatchWithTemplates(+POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID, messages)
  }
}

const sendEmailBatchWithTemplates = (
  templateId: number,
  messages: Array<{
    to: string
    template:
      | ExtendSubscriptionReminderTemplateModel
      | AutoPayReminderTemplateModel
      | AutoPaySuccessTemplateModel
      | AutoPayFailedTemplateModel
  }>
) => {
  try {
    return client.sendEmailBatchWithTemplates(
      messages.map(({ to, template }) => ({
        MessageStream: POSTMARK_MESSAGE_STREAM,
        From: POSTMARK_EMAIL_FROM_ADDRESS,
        To: to,
        TemplateId: templateId,
        TemplateModel: {
          ...template,
          productName: PRODUCT_NAME,
          productUrl: PRODUCT_URL,
        },
      }))
    )
  } catch (e) {
    console.log(e)
    // do nothing
  }
}
