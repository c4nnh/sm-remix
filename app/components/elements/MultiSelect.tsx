import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { cx } from 'class-variance-authority'
import { forwardRef, useEffect, useState } from 'react'
import type { SelectOption } from '~/types'

type Props = {
  label?: string
  placeholder?: string
  values?: string[]
  options?: SelectOption[]
  onChange?: (values: string[]) => void
}

export const MultiSelect = forwardRef<HTMLDivElement, Props>(
  ({ label, placeholder, values = [], options = [], onChange = () => {} }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(values)

    useEffect(() => {
      onChange(selectedValues)
    }, [onChange, selectedValues])

    const isSelected = (value: string) => {
      return selectedValues.find(el => el === value) ? true : false
    }

    const handleSelect = (value: string) => {
      if (!isSelected(value)) {
        setSelectedValues(pre => {
          const selected = options.find(el => el.value === value)
          if (selected) {
            return [...pre, selected.value]
          }
          return pre
        })
      } else {
        handleDeselect(value)
      }
      setIsOpen(true)
    }

    const handleDeselect = (value: string) => {
      setSelectedValues(selectedValues.filter(el => el !== value))
      setIsOpen(true)
    }

    return (
      <Listbox
        as="div"
        className="space-y-1"
        value={selectedValues}
        onChange={value => handleSelect(value as unknown as string)}
      >
        {() => (
          <>
            {!!label && (
              <Listbox.Label className="block text-base leading-5 text-text">
                {label}
              </Listbox.Label>
            )}
            <div className="relative rounded-lg">
              <span className="inline-block w-full rounded-lg shadow-sm">
                <Listbox.Button
                  className={cx([
                    'relative flex w-full items-center justify-between py-3 px-4',
                    'rounded-xl border-2 border-muted-3 bg-transparent',
                    'text-sm font-semibold text-heading',
                    'transition duration-150 ease-in-out',
                  ])}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="block truncate">
                    {selectedValues.length < 1
                      ? placeholder
                      : `Selected ${selectedValues.length} item${
                          selectedValues.length > 1 ? 's' : ''
                        }`}
                  </span>
                  {isOpen ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </Listbox.Button>
              </span>
              <Transition
                unmount={false}
                show={isOpen}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute z-10 mt-1 w-full rounded-xl border-2 border-muted-3 bg-muted-1 shadow-lg"
              >
                <Listbox.Options
                  static
                  className="shadow-xs max-h-60 overflow-auto rounded-xl py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                >
                  {options.map(({ value, label }) => {
                    const selected = isSelected(value)
                    return (
                      <Listbox.Option key={value} value={value}>
                        {({ active }) => (
                          <div
                            className={cx([
                              'flex cursor-pointer select-none items-center gap-2 py-2 pr-4 text-heading hover:bg-primary',
                              active ? 'bg-primary' : '',
                              selected ? 'pl-1' : 'pl-8',
                            ])}
                          >
                            {selected && (
                              <CheckIcon className="h-5 w-5 text-primary" />
                            )}
                            <span
                              className={cx([
                                'block truncate',
                                selected ? 'font-semibold' : 'font-normal',
                              ])}
                            >
                              {label}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'
