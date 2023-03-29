import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Form, Link, useNavigation } from '@remix-run/react'
import { cx } from 'class-variance-authority'
import React, { useMemo, useRef, useState } from 'react'
import { Modal } from '../Modal'

export type Column<T> = {
  label: string
  dataIndex?: keyof T
  render?: (data: T) => React.ReactNode
}

type Props<T> = {
  data: any[]
  columns: Column<T>[]
  deleteUrl?: string
  deleteTitle?: string
  deleteMessage?: string
}

interface BaseObject {
  id: string
}

export const Table = <T extends BaseObject>({
  data,
  columns,
  deleteUrl,
  deleteTitle,
  deleteMessage,
}: Props<T>) => {
  const navigation = useNavigation()
  const deleteFormRef = useRef<Array<HTMLFormElement | null>>([])
  const [hoveredRow, setHoveredRow] = useState<number>(-1)

  const isDeleting = useMemo(
    () => navigation.state === 'submitting',
    [navigation]
  )

  const handleDelete = (id: any) => {
    if (deleteFormRef && deleteFormRef.current) {
      const currentForm = deleteFormRef.current[id]
      if (currentForm) {
        currentForm.submit()
      }
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl bg-layer-2 px-10 py-5 scrollbar">
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
            <th className="w-10" />
          </tr>
        </thead>
        <tbody className="text-sm font-medium">
          {data.map((item, index) => {
            const isHighlighted = index % 2 === 0
            return (
              <tr
                key={item.id}
                className="hover:cursor-pointer"
                onMouseOver={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(-1)}
              >
                {columns.map((col, colIndex) => {
                  const dataIndex = col.dataIndex as string
                  const isFirstCol = colIndex === 0
                  const isHovered = hoveredRow === index
                  return (
                    <td
                      key={`${item.id || colIndex}_${dataIndex || colIndex}`}
                      className={cx([
                        'whitespace-nowrap py-3 px-4 text-heading',
                        isHighlighted ? 'bg-muted-1' : 'bg-layer-2',
                        isFirstCol ? 'rounded-l-lg' : '',
                        isHovered ? 'bg-muted-3 duration-500' : '',
                      ])}
                    >
                      {col.render ? col.render(item) : item[dataIndex]}
                    </td>
                  )
                })}
                <td
                  key={`${item.id || index}_action`}
                  className={cx([
                    'gap-3 whitespace-nowrap rounded-r-lg py-3 px-4 text-heading',
                    isHighlighted ? 'bg-muted-1' : 'bg-layer-2',
                    hoveredRow === index ? 'bg-muted-3 duration-500' : '',
                  ])}
                >
                  <div className="flex gap-2">
                    <Link to={item.id}>
                      <PencilSquareIcon className="h-5 w-5 text-primary duration-500 hover:scale-125 hover:text-blue-400" />
                    </Link>
                    {!!deleteUrl && (
                      <Modal
                        triggerButtonContent={
                          <Form
                            ref={el => (deleteFormRef.current[item.id] = el)}
                            action={`${deleteUrl}/${item.id}`}
                          >
                            <TrashIcon className="h-5 w-5 text-red-500 duration-500 hover:scale-125 hover:text-red-300" />
                          </Form>
                        }
                        onOk={() => handleDelete(item.id)}
                        title={deleteTitle || 'Delete'}
                        message={
                          deleteMessage ||
                          'Are you sure you wish to delete this item?'
                        }
                        okLabel="Delete"
                        okButtonStyleProps={{
                          buttonType: 'danger',
                          disabled: isDeleting,
                          type: 'submit',
                        }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
