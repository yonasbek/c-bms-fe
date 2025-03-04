"use client"

import { FileText, MoreVertical, Calendar, DollarSign, ExternalLink } from "lucide-react"
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

import { useBuildingStore } from "@/store/buildings"
import GlobalLoading from "@/components/global-loading"
import { AddContractDialog } from "./add-contract-dialog"
import { useGetBuildingContracts } from "@/store/server/contract"
import ContractType from "@/types/contract"

const contractStatusColors = {
  active: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
}

export function ContractsList() {
  const { activeBuilding } = useBuildingStore();
  const { data: contracts, isLoading, isError } = useGetBuildingContracts(activeBuilding?.id);

  if (isLoading) return <GlobalLoading title="Contracts"/>;
  console.log(contracts)
  if (isError) return <div>Error loading contracts</div>;

  const getFullFileUrl = (partialUrl: string | null) => {
    if (!partialUrl) return null;
    return `${process.env.NEXT_PUBLIC_API_URL}/${partialUrl}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Contracts</h2>
        <AddContractDialog />
      </div>

      {contracts && contracts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contracts.map((contract: ContractType) => (
            <Card key={contract.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {contract.user?.name}
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Room {contract.room?.room_number}
                      </Badge>
                    </CardTitle>
                    <CardDescription></CardDescription>
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
                      <DropdownMenuItem className="text-red-600">
                        Terminate Contract
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Period</span>
                    </div>
                    <div className="text-sm">
                      {new Date(contract.start_date).toLocaleDateString()} -{" "}
                      {new Date(contract.end_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Monthly Rent
                        </span>
                      </div>
                      <span className="font-medium">
                        ${contract.monthly_rent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          contractStatusColors[
                            contract.contract_status as keyof typeof contractStatusColors
                          ]
                        }
                      >
                        {contract.contract_status}
                      </Badge>
                    </div>
                  </div>
                  {contract.file_url && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Contract Document
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          onClick={() => window.open(getFullFileUrl(contract.file_url), '_blank')}
                        >
                          <FileText className="h-4 w-4" />
                          View Document
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-center">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Contracts</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get started by creating a new contract.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 