import { SidebarTrigger } from '@/components/ui/sidebar'
import MenuBar from '@/app/(default-layout)/board/components/BoardMenu'
import MenuNav from '@/app/(default-layout)/board/components/BoardNav'

export default function BoardHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background flex flex-row h-16 items-center gap-2 border-b px-4 py-2">
      <SidebarTrigger className="-ml-1 rounded-full border border-border" />
      <div className="flex flex-col justify-center w-full">
        <MenuNav />
        <MenuBar />
      </div>
    </header>
  )
}