import type { PropsWithChildren } from 'react'
import { LogoIcon } from '~/components'

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="-mt-60 flex min-w-[500px] flex-col justify-center bg-red-200 px-8 py-10">
        <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto h-12 text-heading">
            <LogoIcon viewBox="0 0 30 25" className="text-blue-500" />
          </div>
          <span className="text-center text-xl font-bold text-white">
            Self management
          </span>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 sm:px-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
