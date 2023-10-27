import SideMenu from '@/components/ui/side-menu'
import { MENU_ROUTE_MAPPING } from '@/constants'

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-full bg-gray-50'>
      <SideMenu
        className='flex-grow max-w-[25ch]'
        routes={MENU_ROUTE_MAPPING}
      />
      <div className='flex-grow overflow-auto'>
        {children}
      </div>
    </div>
  )
}