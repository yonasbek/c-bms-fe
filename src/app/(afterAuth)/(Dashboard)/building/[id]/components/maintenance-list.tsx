"use client"

import { useState } from "react"
import { Calendar, Clock, MoreVertical, AlertCircle } from "lucide-react"
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
import { UpdateMaintenanceStatus } from "./update-maintenance"
import { cn } from "@/lib/utils"

type MaintenanceStatus = "pending" | "in_progress" | "completed" | "cancelled"
type Priority = "low" | "medium" | "high" | "urgent"

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  room: string
  requestedAt: string
  status: MaintenanceStatus
  category: string
  
}

// Dummy data
const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "AC Not Working",
    description: "The air conditioning unit is making strange noises and not cooling properly.",
    room: "301",
    requestedAt: "2025-02-27T08:00:00",
    status: "pending",
    category: "HVAC",
  },
  {
    id: "2",
    title: "Leaking Faucet",
    description: "Bathroom faucet is constantly dripping.",
    room: "205",
    requestedAt: "2025-02-26T15:30:00",
    status: "in_progress",
    category: "Plumbing",
    
  },
  // Add more requests as needed
]

const statusColors: Record<MaintenanceStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-800",
}



export function MaintenanceList() {
  const [filter, setFilter] = useState<MaintenanceStatus | "all">("all")

  const filteredRequests = maintenanceRequests.filter((request) => filter === "all" || request.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Maintenance Requests</h2>
          <p className="text-sm text-muted-foreground">Manage and track maintenance requests for this building</p>
        </div>
        <Button>New Request</Button>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filter} onValueChange={(value: MaintenanceStatus | "all") => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {request.title}
                    <Badge variant="outline">Room {request.room}</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(request.requestedAt).toLocaleTimeString()}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                 
                  <Badge className={cn(statusColors[request.status],'hover:text-black hover:bg-white cursor-default')} >
                    {request.status
                      .split("_")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <UpdateMaintenanceStatus
                        requestId={request.id}
                        currentStatus={request.status}
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update Status</DropdownMenuItem>
                        }
                      />
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{request.description}</p>
              
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

