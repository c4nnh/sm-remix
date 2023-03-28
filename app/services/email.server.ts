import { ServerClient } from 'postmark'
import type {
  ConfirmEmailTemplateModel,
  ExtendSubscriptionTemplateModel,
} from '~/types'
import {
  NODE_ENV,
  POSTMARK_API_KEY,
  POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
  POSTMARK_EMAIL_FROM_ADDRESS,
  POSTMARK_MESSAGE_STREAM,
  PRODUCT_NAME,
  PRODUCT_URL,
} from './env'

const client = new ServerClient(POSTMARK_API_KEY)

export const sendConfirmEmail = (
  to: string,
  templateModel: ConfirmEmailTemplateModel
) => {
  if (NODE_ENV !== 'production') {
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
          product_name: PRODUCT_NAME,
          product_url: PRODUCT_URL,
        },
      })
    } catch {
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
  if (NODE_ENV !== 'production') {
    console.log('---')
    console.log('Email Extend Subscription Reminder:')
    messages.forEach(message => console.log(JSON.stringify(message)))
    console.log('---')
  }

  if (NODE_ENV === 'production') {
    try {
      return client.sendEmailBatchWithTemplates(
        messages.map(({ to, template }) => ({
          MessageStream: POSTMARK_MESSAGE_STREAM,
          From: POSTMARK_EMAIL_FROM_ADDRESS,
          To: to,
          TemplateId: +POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
          TemplateModel: {
            ...template,
            product_name: PRODUCT_NAME,
            product_url: PRODUCT_URL,
          },
        }))
      )
    } catch {
      // do nothing
    }
  }
}
