import { NODE_ENV } from './env.server'

// const client = new ServerClient(POSTMARK_API_KEY)

type SendEmailProps = {
  to: string
  subject: string
  html?: string
  text?: string
}

export const sendEmail = (payload: SendEmailProps) => {
  if (NODE_ENV !== 'production') {
    console.log('---')
    console.log('Email:')
    console.log(JSON.stringify(payload, null, 2))
    console.log('---')
  }

  // if (NODE_ENV === 'production') {
  //   return client.sendEmail({
  //     MessageStream: POSTMARK_MESSAGE_STREAM,
  //     From: EMAIL_FROM_ADDRESS,
  //     To: payload.to,
  //     Subject: payload.subject,
  //     HtmlBody: payload.html,
  //     TextBody: payload.text,
  //   })
  // }
}
