import type { Location } from '@remix-run/react'
import { PAGINATION, QUERY_KEY } from '~/constants'

export const getPaginationAndSearchParams = (request: Request) => {
  const url = new URL(request.url)
  const search = (url.searchParams.get(QUERY_KEY.SEARCH) || '').trim()
  const take = url.searchParams.get(QUERY_KEY.TAKE) || PAGINATION.TAKE
  const skip = url.searchParams.get(QUERY_KEY.SKIP) || PAGINATION.SKIP

  return {
    search,
    take: +take,
    skip: +skip,
  }
}

export const onChangeParams = (
  newValue: string,
  key: string,
  location: Location,
  params: URLSearchParams
) => {
  const keyParam = QUERY_KEY[key.toUpperCase() as keyof typeof QUERY_KEY]

  const { pathname, search: query } = location
  const oldValue = params.get(keyParam) || ''

  let newQuery = ''

  if (!newValue) {
    return `${pathname}${query.replace(`${keyParam}=${oldValue}`, '')}`
  }

  if (query.includes(`${keyParam}=${oldValue}`)) {
    newQuery = query.replace(
      `${keyParam}=${oldValue}`,
      `${keyParam}=${newValue}`
    )
  } else {
    newQuery = `${query}${query ? '&' : '?'}${keyParam}=${newValue}`
  }

  return `${pathname}${newQuery}`
}

export const getPageNumbersWithDot = (
  currentPage: number,
  numberOfPage: number
) => {
  const left = currentPage - PAGINATION.GAP
  const right = currentPage + PAGINATION.GAP

  const pageNumbersWithDots: number[] = []

  const pageNumbers = [...Array(numberOfPage).keys()]
    .filter(item => {
      const page = item + 1
      return (
        page == 1 || page == numberOfPage || (page >= left && page <= right)
      )
    })
    .map(item => item + 1)

  if (pageNumbers.length <= 3) return pageNumbers

  pageNumbers.forEach((page, index) => {
    if (page === 1 && page + 1 !== pageNumbers[index + 1]) {
      pageNumbersWithDots.push(page)
      pageNumbersWithDots.push(-1)
      return
    }

    if (page === numberOfPage && page - 1 !== pageNumbers[index - 1]) {
      pageNumbersWithDots.push(-1)
      pageNumbersWithDots.push(page)
      return
    }
    pageNumbersWithDots.push(page)
  })

  return pageNumbersWithDots
}
