"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "../../ui/sidebar.tsx"
import type {QuizDto} from "@/modules/quiz/dto/quiz.dto.ts";
import {Link} from "@tanstack/react-router";

interface Props {
    items: QuizDto[]
}

export function SidebarHistory({items}: Props) {
    const {setOpenMobile, isMobile} = useSidebar();

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
                            <Link to={"/quiz/" + item.id + '/results'}>
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
