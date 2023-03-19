import { ROUTES } from '~/constants'
import { confirmEmailToken, sendEmail } from '~/services'

export const sendConfirmEmail = async ({
  originUrl,
  userId,
  email,
}: {
  originUrl: string
  userId: string
  email: string
}) => {
  try {
    const token = await confirmEmailToken.create(
      {
        userId,
        email,
      },
      {
        expiresIn: '2d',
      }
    )
    const confirmUrl = `${originUrl}${ROUTES.CONFIRM_EMAIL}?token=${token}}`
    sendEmail({
      to: email,
      subject: 'User Registration',
      text: `Welcome! Please use this link to finish user registration: ${confirmUrl}`,
    })
  } catch {
    // do nothing
  }
}
