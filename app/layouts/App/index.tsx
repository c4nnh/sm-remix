import { useNavigation } from '@remix-run/react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { Loading } from '~/components'
import { MobileSidebar } from './MobileSidebar'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigation = useNavigation()

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function openSidebar() {
    setIsSidebarOpen(true)
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden w-64 flex-shrink-0 md:block">
        <Sidebar />
      </div>
      <div className="relative w-full flex-1 overflow-hidden">
        <Navbar openSidebar={openSidebar} />
        <div className="flex h-full w-full items-center justify-center overflow-x-hidden p-5">
          {navigation.state === 'loading' ? <Loading /> : children}
        </div>
      </div>
      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
    </div>
  )
}
