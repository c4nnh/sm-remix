import { cx } from 'class-variance-authority'
import React from 'react'

export type Column<T> = {
  label: string
  dataIndex?: keyof T
  render?: (data: T) => React.ReactNode
}

type Props<T> = {
  data: any[]
  columns: Column<T>[]
}

interface BaseObject {
  id: string
}

export const Table = <T extends BaseObject>({ data, columns }: Props<T>) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-layer-2 px-11 py-6 scrollbar">
      <table className="w-full">
        <thead className="text-xs font-semibold uppercase text-text">
          <tr>
            {columns.map(({ label }) => (
              <th
                key={label}
                className="whitespace-nowrap bg-layer-2 py-3 px-4 text-left text-base font-bold text-text"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {data.map((item, index) => {
            const isHighlighted = index % 2 === 0
            return (
              <tr key={item.id} className="hover:cursor-pointer">
                {columns.map((col, colIndex) => {
                  const dataIndex = col.dataIndex as string
                  const isFirstCol = colIndex === 0
                  const isLastCol = colIndex === columns.length - 1
                  return (
                    <td
                      key={`${item.id}_${dataIndex}`}
                      className={cx([
                        'whitespace-nowrap py-3 px-4 text-heading',
                        isHighlighted ? 'bg-muted-1' : 'bg-layer-2',
                        isFirstCol ? 'rounded-l-lg' : '',
                        isLastCol ? 'rounded-r-lg' : '',
                      ])}
                    >
                      {col.render ? col.render(item) : item[dataIndex]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
