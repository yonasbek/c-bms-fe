"use client"

import { useState } from "react"
import { MoreVertical, User, Home, FileText, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type PaymentStatus = "paid" | "overdue" | "pending"
type ContractStatus = "active" | "expiring" | "expired"

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  room: string
  avatarUrl?: string
  contract: {
    startDate: string
    endDate: string
    monthlyRent: number
    status: ContractStatus
  }
  payment: {
    status: PaymentStatus
    lastPaid?: string
    dueDate: string
    amount: number
  }
}

// Dummy data
const tenants: Tenant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    room: "301",
    avatarUrl: "/placeholder.svg",
    contract: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 1500,
      status: "active",
    },
    payment: {
      status: "paid",
      lastPaid: "2025-02-01",
      dueDate: "2025-03-01",
      amount: 1500,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8901",
    room: "205",
    avatarUrl: "/placeholder.svg",
    contract: {
      startDate: "2024-06-01",
      endDate: "2025-05-31",
      monthlyRent: 1800,
      status: "active",
    },
    payment: {
      status: "overdue",
      lastPaid: "2025-01-01",
      dueDate: "2025-02-01",
      amount: 1800,
    },
  },
  // Add more tenants as needed
]

const paymentStatusColors: Record<PaymentStatus, string> = {
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
}

const contractStatusColors: Record<ContractStatus, string> = {
  active: "bg-green-100 text-green-800",
  expiring: "bg-yellow-100 text-yellow-800",
  expired: "bg-gray-100 text-gray-800",
}

export function TenantsList() {
  const [filter, setFilter] = useState<PaymentStatus | "all">("all")

  const filteredTenants = tenants.filter((tenant) => filter === "all" || tenant.payment.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Current Tenants</h2>
          <p className="text-sm text-muted-foreground">Manage tenants and their contracts</p>
        </div>
        <Button>Add New Tenant</Button>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filter} onValueChange={(value: PaymentStatus | "all") => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tenants</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={tenant.avatarUrl} alt={tenant.name} />
                    <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {tenant.name}
                      <Badge variant="outline">Room {tenant.room}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {tenant.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="h-3 w-3" />
                        {tenant.phone}
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Contract</DropdownMenuItem>
                    <DropdownMenuItem>Record Payment</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Terminate Contract</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      Contract Period
                    </span>
                    <Badge variant="outline" className={contractStatusColors[tenant.contract.status]}>
                      {tenant.contract.status.charAt(0).toUpperCase() + tenant.contract.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    {new Date(tenant.contract.startDate).toLocaleDateString()} -{" "}
                    {new Date(tenant.contract.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Payment Status
                    </span>
                    <Badge className={paymentStatusColors[tenant.payment.status]}>
                      {tenant.payment.status.charAt(0).toUpperCase() + tenant.payment.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Rent:</span>
                      <span className="font-medium">${tenant.contract.monthlyRent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Due Date:</span>
                      <span>{new Date(tenant.payment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {tenant.payment.lastPaid && (
                      <div className="flex justify-between text-sm">
                        <span>Last Paid:</span>
                        <span>{new Date(tenant.payment.lastPaid).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

