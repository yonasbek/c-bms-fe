"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal } from "lucide-react"
import { ViewInventoryDialog } from "./view-inventory-dialog"
import { AddInventoryDialog } from "./add-inventory-dialog.tsx"
type InventoryStatus = "operational" | "maintenance" | "repair" | "retired"
type InventoryType = "generator" | "hvac" | "elevator" | "security" | "other"

interface InventoryItem {
  id: string
  name: string
  type: InventoryType
  model: string
  serialNumber: string
  location: string
  purchaseDate: string
  warrantyExpiry: string
  status: InventoryStatus
  lastMaintenance?: string
  nextMaintenance?: string
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Backup Generator",
    type: "generator",
    model: "PowerGen 5000",
    serialNumber: "PG5K-123456",
    location: "Basement Level 1",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2026-01-15",
    status: "operational",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-07-15",
  },
  {
    id: "2",
    name: "Main HVAC System",
    type: "hvac",
    model: "CoolMax Pro",
    serialNumber: "CM-789012",
    location: "Roof",
    purchaseDate: "2022-06-20",
    warrantyExpiry: "2025-06-20",
    status: "maintenance",
    lastMaintenance: "2024-12-20",
    nextMaintenance: "2025-03-20",
  },
  // Add more items as needed
]

const statusColors: Record<InventoryStatus, string> = {
  operational: "bg-green-100 text-green-800",
  maintenance: "bg-yellow-100 text-yellow-800",
  repair: "bg-red-100 text-red-800",
  retired: "bg-gray-100 text-gray-800",
}

export function InventoryList() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<InventoryType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<InventoryStatus | "all">("all")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={typeFilter} onValueChange={(value: InventoryType | "all") => setTypeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="generator">Generator</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="elevator">Elevator</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value: InventoryStatus | "all") => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddInventoryDialog />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Maintenance</TableHead>
              <TableHead>Warranty Expiry</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge className={statusColors[item.status]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.nextMaintenance ? new Date(item.nextMaintenance).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell>{new Date(item.warrantyExpiry).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedItem(item)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Remove Item</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedItem && (
        <ViewInventoryDialog item={selectedItem} open={!!selectedItem} onOpenChange={() => setSelectedItem(null)} />
      )}
    </div>
  )
}

