import { SubscriptionSuccess } from '~/components'
import { ROUTES } from '~/constants'

export default function ExtendSubscriptionSuccess() {
  return <SubscriptionSuccess redirectPath={ROUTES.PROJECTS} />
}
