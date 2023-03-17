import type { PropsWithChildren } from "react";
import { useState } from "react";
import { MobileSidebar } from "./MobileSidebar";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden w-64 flex-shrink-0 md:block">
        <Sidebar />
      </div>
      <div className="relative w-full flex-1 md:overflow-hidden">
        <Navbar openSidebar={openSidebar} />
        {children}
      </div>
      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />
    </div>
  );
};
