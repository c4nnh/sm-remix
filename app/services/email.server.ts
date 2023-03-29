import { ServerClient } from 'postmark'
import type {
  AutoPayTemplateModel,
  ConfirmEmailTemplateModel,
  ExtendSubscriptionTemplateModel,
} from '~/types'
import {
  NODE_ENV,
  POSTMARK_API_KEY,
  POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID,
  POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
  POSTMARK_EMAIL_FROM_ADDRESS,
  POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID,
  POSTMARK_MESSAGE_STREAM,
  PRODUCT_NAME,
  PRODUCT_URL,
} from './env'

const client = new ServerClient(POSTMARK_API_KEY)

export const sendConfirmEmail = (
  to: string,
  templateModel: ConfirmEmailTemplateModel
) => {
  if (NODE_ENV === 'production') {
    console.log('---')
    console.log('Email Confirmation:')
    console.log(JSON.stringify(templateModel, null, 2))
    console.log('---')
  }

  if (NODE_ENV === 'production') {
    try {
      return client.sendEmailWithTemplate({
        MessageStream: POSTMARK_MESSAGE_STREAM,
        From: POSTMARK_EMAIL_FROM_ADDRESS,
        To: to,
        TemplateId: +POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
        TemplateModel: {
          ...templateModel,
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
  messages: Array<{
    to: string
    template: ExtendSubscriptionTemplateModel
  }>
) => {
  if (NODE_ENV === 'production') {
    console.log('---')
    console.log('Email Extend Subscription Reminder:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV !== 'production') {
    sendEmailBatchWithTemplates(
      +POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID,
      messages
    )
  }
}

export const sendAutoPayReminder = (
  messages: Array<{ to: string; template: AutoPayTemplateModel }>
) => {
  if (NODE_ENV === 'production') {
    console.log('---')
    console.log('Email Auto Pay Reminder:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV !== 'production') {
    sendEmailBatchWithTemplates(
      +POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID,
      messages
    )
  }
}

const sendEmailBatchWithTemplates = (
  templateId: number,
  messages: Array<{
    to: string
    template: ExtendSubscriptionTemplateModel | AutoPayTemplateModel
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
