import { PlusIcon } from '@heroicons/react/24/outline'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react'
import { Button, InputSearch } from '~/components/elements'
import { QUERY_KEY } from '~/constants'
import { onChangeParams } from '~/utils'

type Props = {
  createPath: string
}

export const ListHeader: React.FC<Props> = ({ createPath }) => {
  const [params] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const onSearch = (value: string) => {
    const newUrl = onChangeParams(value, QUERY_KEY.SEARCH, location, params)
    return navigate(newUrl)
  }

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-layer-2 py-5 px-10">
      <InputSearch
        value={params.get(QUERY_KEY.SEARCH) || ''}
        onSearch={onSearch}
      />
      <Link to={createPath}>
        <Button buttonType="primary">
          <PlusIcon className="h-5 w-5" />
          Create
        </Button>
      </Link>
    </div>
  )
}
