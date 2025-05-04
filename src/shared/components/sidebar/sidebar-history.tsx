"use client"

import {
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar
} from "../../ui/sidebar.tsx"
import type { QuizDto } from "@/modules/quiz/dto/quiz.dto.ts";
import { Link } from "@tanstack/react-router";
import { IconCircleCheck, IconClock } from "@tabler/icons-react";

interface Props {
  items: QuizDto[]
}

export function SidebarHistory({ items }: Props) {
  const { setOpenMobile, isMobile } = useSidebar();

  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild onClick={closeSidebar}>
              <Link
                to={item.score !== undefined ? "/quiz/" + item.id + '/results' : "/quiz/" + item.id}>
                {item.score !== undefined
                  ? <IconCircleCheck className="size-8! text-green-500"/>
                  : <IconClock className="size-7! text-yellow-500"/>
                }
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toDateString()}
                    {item.score !== undefined && ` • ${item.score} / ${item.totalPoints}`}
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
