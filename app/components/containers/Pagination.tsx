import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate, useSearchParams } from '@remix-run/react'
import { cx } from 'class-variance-authority'
import { PAGINATION, QUERY_KEY } from '~/constants'
import { paginationItem } from '~/styles'
import { getPageNumbersWithDot, onChangeParams } from '~/utils'

type Props = {
  total?: number
}

export const Pagination: React.FC<Props> = ({ total = 0 }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const numberOfPage = Math.ceil(total / PAGINATION.TAKE)
  const skip = parseInt(params.get(QUERY_KEY.SKIP) || `${PAGINATION.SKIP}`)

  const currentPage = Math.ceil(skip / PAGINATION.TAKE) + 1

  const onPageChange = (page: number) => {
    const skip = page * PAGINATION.TAKE - 1
    const newUrl = onChangeParams(`${skip}`, QUERY_KEY.SKIP, location, params)
    return navigate(newUrl)
  }

  if (!total) return <></>

  return (
    <div className="flex flex-1 flex-col items-center space-y-6">
      <nav className="flex items-center" aria-label="Pagination">
        <button
          type="button"
          className={cx(paginationItem(), [
            'rounded-l-xl',
            'disabled:cursor-not-allowed',
          ])}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {getPageNumbersWithDot(currentPage, numberOfPage).map(
          (pageNumber, index) => {
            if (pageNumber < 0) {
              return (
                <button
                  key={`${pageNumber}_${index}`}
                  className={cx(paginationItem(), '-ml-0.5')}
                >
                  ...
                </button>
              )
            }

            return (
              <button
                onClick={() => onPageChange(pageNumber)}
                key={pageNumber}
                type="button"
                className={cx(
                  paginationItem(),
                  pageNumber === currentPage
                    ? 'font-semibold text-primary'
                    : '',
                  '-ml-0.5'
                )}
              >
                {pageNumber}
              </button>
            )
          }
        )}
        <button
          type="button"
          className={cx(paginationItem(), [
            '-ml-0.5 rounded-r-xl',
            'disabled:cursor-not-allowed',
          ])}
          disabled={currentPage === numberOfPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </div>
  )
}
