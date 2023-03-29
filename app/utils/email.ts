import { ROUTES } from '~/constants'
import {
  confirmEmailToken,
  sendConfirmEmail as pSendConfirmEmail,
} from '~/services'

export const sendConfirmEmail = async ({
  originUrl,
  userId,
  name,
  email,
}: {
  originUrl: string
  userId: string
  name: string
  email: string
}) => {
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
  pSendConfirmEmail({
    to: email,
    template: {
      name: name,
      confirmUrl,
    },
  })
}
