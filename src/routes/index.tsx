import {SidebarInset, SidebarProvider} from '@/shared/ui/sidebar'
import {createFileRoute, Outlet} from '@tanstack/react-router'
import {SiteHeader} from "@/shared/components/SiteHeader";
import {AppSidebar} from "@/shared/components/sidebar/app-sidebar";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset"/>
      <SidebarInset>
        <SiteHeader/>
        <div className="flex flex-1 flex-col">
          hello
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
