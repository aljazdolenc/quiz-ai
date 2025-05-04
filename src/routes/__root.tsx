import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet, Scripts, } from "@tanstack/react-router";
import appCss from "@/styles.css?url";
import { Toaster } from "@/shared/ui/sonner.tsx";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QuizProvider } from "@/modules/quiz/hooks/quizContext.tsx";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar.tsx";
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar.tsx";
import { SiteHeader } from "@/shared/components/layout/SiteHeader.tsx";
import ChatIcon from "@/modules/chat/components/chat/ChatIcon.tsx";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "React TanStarter",
      },
      {
        name: "description",
        content: "A minimal starter template for 🏝️ TanStack Start.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <QuizProvider>
        <SidebarProvider>
          <AppSidebar variant="inset" className="h-[100dvh]"/>
          <SidebarInset>
            <SiteHeader/>
            <div
              className="flex flex-1 flex-col items-center min-h-0 overflow-y-auto">
              <div
                className="@container/main flex flex-1 flex-col gap-2 w-full max-w-[90%] md:max-w-[80%]">
                <Outlet/>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </QuizProvider>
      <TanStackRouterDevtools position="bottom-right"/>
      <Scripts/>
      <Toaster richColors position="top-right"/>
      <ChatIcon/>
    </>
  );
}
