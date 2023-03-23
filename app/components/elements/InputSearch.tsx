import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onSearch?: (search: string) => void
}

export const InputSearch: React.FC<Props> = ({
  value,
  placeholder,
  onSearch = () => {},
}) => {
  const [search, setSearch] = useState(value || '')

  const handleSearch = () => onSearch(search)

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <label
        htmlFor="Search"
        className="sr-only block text-sm font-semibold text-heading"
      >
        Search
      </label>
      <div className="relative flex">
        <input
          id="price"
          name="price"
          placeholder={placeholder || 'Search'}
          className="block w-full rounded-xl border-2 border-layer-3 bg-muted-1 px-4 py-2.5 pr-14 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleOnKeyDown}
        />
        <div className="absolute inset-y-0 right-0 z-20 flex flex-shrink-0 items-center pr-4">
          <div
            className="cursor-pointer rounded-md bg-muted-2 px-2 py-1 hover:bg-muted-3"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-text" />
          </div>
        </div>
      </div>
    </div>
  )
}
