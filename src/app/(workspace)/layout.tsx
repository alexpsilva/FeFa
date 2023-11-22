import SideMenu from '@/components/features/sideMenu'
import { MENU_ROUTE_MAPPING } from '@/constants'

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='
      flex h-full bg-skin-offwhite 
      text-skin-base stroke-skin-base border-skin-base'
    >
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