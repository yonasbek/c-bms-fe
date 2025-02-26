import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, ClipboardList, Wrench } from "lucide-react"

export default function Page() {
  return (  
    <div className="space-y-6">
    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">145</div>
          <p className="text-xs text-muted-foreground">+4 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">132</div>
          <p className="text-xs text-muted-foreground">+12 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">9</div>
          <p className="text-xs text-muted-foreground">+2 from yesterday</p>
        </CardContent>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium">New tenant registered</p>
              <p className="text-sm text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Maintenance request completed</p>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">New contract signed</p>
              <p className="text-sm text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Occupancy Rate</p>
              <p className="text-sm font-medium">87%</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Revenue This Month</p>
              <p className="text-sm font-medium">$52,000</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Pending Payments</p>
              <p className="text-sm font-medium">$3,200</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  )
}
