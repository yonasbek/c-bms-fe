"use client"

import * as React from "react"
import { ClipboardList, Wrench, Bell, LogOut } from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { useTenantContract, useTenantMaintenanceRequests } from "@/hooks/use-tenant-queries"
import { useTenantStore } from "@/store/tenant"
import { useEffect } from "react"

// Tenant-specific navigation items - removed "My Room" item
const items = [
  {
    title: "My Contract",
    href: "/tenant/contract",
    icon: ClipboardList,
  },
  {
    title: "Maintenance",
    href: "/tenant/maintenance",
    icon: Wrench,
  },
  {
    title: "Notifications",
    href: "/tenant/notifications",
    icon: Bell,
  },
]

export function TenantSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const { setLoading } = useTenantStore();
  
  // Initialize queries - removed roomQuery
  const contractQuery = useTenantContract({userId: session?.user?.id || ''});
  const maintenanceQuery = useTenantMaintenanceRequests();
  
  // Set loading state based on queries
  useEffect(() => {
    const isLoading = 
      contractQuery.isLoading;
    
    setLoading(isLoading);
  }, [
    contractQuery.isLoading,
    setLoading
  ]);
  
  // Handle loading state
  if (status === "loading" || contractQuery.isLoading || maintenanceQuery.isLoading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Tenant Portal</h2>
            <p className="text-xs text-muted-foreground mt-1">Loading...</p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={items} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Tenant Portal</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Welcome, {session?.user?.name?.split(' ')[0] || 'Tenant'}
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-4 p-4">
          <NavUser user={{ 
            name: session?.user?.name || "", 
            email: session?.user?.email || "", 
            avatar: session?.user?.image || "" 
          }} />
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 