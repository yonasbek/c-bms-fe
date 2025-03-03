"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Building2, Calendar, DollarSign, Star, Users } from "lucide-react"
import { AddSubContractDialog } from "./add-sub-contract-dialog"
import { ViewSubContractDialog } from "./view-sub-contract"

type ContractStatus = "active" | "expiring" | "expired" | "terminated"
type ServiceType = "security" | "cleaning" | "maintenance" | "landscaping" | "other"

interface SubContract {
  id: string
  companyName: string
  serviceType: ServiceType
  contractStart: string
  contractEnd: string
  status: ContractStatus
  monthlyFee: number
  staffCount: number
  rating: number
  contactPerson: {
    name: string
    phone: string
    email: string
  }
  serviceSchedule: {
    days: string[]
    hours: string
  }
  lastPayment?: string
  nextPayment?: string
}

const subContracts: SubContract[] = [
  {
    id: "1",
    companyName: "SecureGuard Solutions",
    serviceType: "security",
    contractStart: "2024-01-01",
    contractEnd: "2024-12-31",
    status: "active",
    monthlyFee: 5000,
    staffCount: 8,
    rating: 4.5,
    contactPerson: {
      name: "John Smith",
      phone: "+1 234 567 8900",
      email: "john.smith@secureguard.com",
    },
    serviceSchedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: "24/7",
    },
    lastPayment: "2025-02-01",
    nextPayment: "2025-03-01",
  },
  {
    id: "2",
    companyName: "CleanPro Services",
    serviceType: "cleaning",
    contractStart: "2024-06-01",
    contractEnd: "2025-05-31",
    status: "active",
    monthlyFee: 3500,
    staffCount: 6,
    rating: 4.8,
    contactPerson: {
      name: "Sarah Johnson",
      phone: "+1 234 567 8901",
      email: "sarah.j@cleanpro.com",
    },
    serviceSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "9:00 AM - 5:00 PM",
    },
    lastPayment: "2025-02-01",
    nextPayment: "2025-03-01",
  },
  // Add more contracts as needed
]

const statusColors: Record<ContractStatus, string> = {
  active: "bg-green-100 text-green-800",
  expiring: "bg-yellow-100 text-yellow-800",
  expired: "bg-red-100 text-red-800",
  terminated: "bg-gray-100 text-gray-800",
}

const serviceIcons = {
  security: Users,
  cleaning: Building2,
  maintenance: Building2,
  landscaping: Building2,
  other: Building2,
}

export function SubContractList() {
  const [search, setSearch] = useState("")
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "all">("all")
  const [selectedContract, setSelectedContract] = useState<SubContract | null>(null)

  const filteredContracts = subContracts.filter((contract) => {
    const matchesSearch = contract.companyName.toLowerCase().includes(search.toLowerCase())
    const matchesService = serviceFilter === "all" || contract.serviceType === serviceFilter
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesService && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={serviceFilter} onValueChange={(value: ServiceType | "all") => setServiceFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="landscaping">Landscaping</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(value: ContractStatus | "all") => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Contract status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring">Expiring</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddSubContractDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContracts.map((contract) => {
          const ServiceIcon = serviceIcons[contract.serviceType]
          return (
            <Card
              key={contract.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => setSelectedContract(contract)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">{contract.companyName}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <ServiceIcon className="h-4 w-4" />
                        <span className="capitalize">{contract.serviceType}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[contract.status]}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Contract End:</span>
                    </div>
                    <span>{new Date(contract.contractEnd).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Monthly Fee:</span>
                    </div>
                    <span>${contract.monthlyFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Staff Count:</span>
                    </div>
                    <span>{contract.staffCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>Rating:</span>
                    </div>
                    <span>{contract.rating}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedContract && (
        <ViewSubContractDialog
          contract={selectedContract}
          open={!!selectedContract}
          onOpenChange={() => setSelectedContract(null)}
        />
      )}
    </div>
  )
}

