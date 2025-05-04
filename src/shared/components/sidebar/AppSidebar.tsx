import { type ComponentProps } from "react";
import { SidebarHistory } from "@/shared/components/sidebar/SidebarHistory.tsx";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, useSidebar
} from "../../ui/sidebar.tsx";
import { useQuizContext } from "@/modules/quiz/hooks/quizContext.tsx";
import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button.tsx";
import { IconChevronRight } from "@tabler/icons-react";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { quizzes } = useQuizContext();
  const { setOpenMobile, isMobile } = useSidebar();

  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              onClick={closeSidebar}
            >
              <Link to="/quiz">
                <img className="h-8" src="/logo.png" alt="logo"/>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory items={quizzes}/>
      </SidebarContent>
      <SidebarFooter>
        <Link to="/quiz" onClick={closeSidebar}>
          <Button className="w-full" size="lg">
            New Quiz
            <IconChevronRight className="size-6 ml-1"/>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
