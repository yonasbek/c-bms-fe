"use client"

import * as React from "react"
import { Building2, ClipboardList, Home, Users, Wrench, Box, Shield, Bell, UserCircle } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { BuildingSwitcher} from "@/components/building-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { buildings__ } from "@/sampleData/buildingsData"
import { userData__ } from "@/sampleData/userData"

// This is sample data.
const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Buildings",
    href: "/buildings",
    icon: Building2,
  },
  {
    title: "Tenants",
    href: "/tenants",
    icon: Users,
  },
  {
    title: "Contracts",
    href: "/contracts",
    icon: ClipboardList,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Box,
  },
  {
    title: "Sub-Contracts",
    href: "/sub-contracts",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Users",
    href: "/users",
    icon: UserCircle,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BuildingSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData__} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
