"use client"

import { useTenantContract, useTenantBuilding } from "@/hooks/use-tenant-queries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarRange, DollarSign, FileText, Download, Building } from "lucide-react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { TenantContract } from "@/types/tenant"

export default function TenantContractPage() {
  const { data: session } = useSession();
  const [activeContract, setActiveContract] = useState<TenantContract | null>(null);
  
  // Initialize the queries
  const { data: contracts, isLoading: contractLoading, error: contractError } = useTenantContract({
    userId: session?.user?.id || ''
  });
  
  const { data: building, isLoading: buildingLoading } = useTenantBuilding();
  
  // Set the active contract (first one by default)
  useEffect(() => {
    if (contracts && contracts.length > 0) {
      const activeOne = contracts.find(c => c.contract_status === "active") || contracts[0];
      setActiveContract(activeOne);
      
      console.log("[Tenant UI] Contracts received:", contracts);
      console.log("[Tenant UI] Active contract set:", activeOne);
    }
  }, [contracts]);
  
  // Log building information for debugging
  useEffect(() => {
    if (building) {
      console.log("[Tenant UI] Current building:", building);
    }
  }, [building]);
  
  const isLoading = contractLoading || buildingLoading;
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">My Contract</h1>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-40" />
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  if (contractError) {
    return (
      <div className="container mx-auto py-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{contractError instanceof Error ? contractError.message : "An error occurred"}</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!contracts || contracts.length === 0 || !activeContract) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>No Contract Found</CardTitle>
            <CardDescription>You don&apos;t have an active contract yet.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }
  
  // Function to get the full file URL
  const getFullFileUrl = (partialUrl: string | null | undefined): string => {
    if (!partialUrl) return '';
    return `${process.env.NEXT_PUBLIC_API_URL}${partialUrl}`;
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Contract</h1>
        {building && (
          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{building.name}</span>
          </div>
        )}
      </div>
      
      {contracts.length > 1 && (
        <div className="flex gap-2 mb-4">
          {contracts.map((contract) => (
            <Button 
              key={contract.id}
              variant={activeContract.id === contract.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveContract(contract)}
            >
              Room {contract.room.room_number}
              <Badge 
                variant={contract.contract_status === 'active' ? 'default' : 'secondary'}
                className="ml-2 capitalize"
              >
                {contract.contract_status}
              </Badge>
            </Button>
          ))}
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Details
          </CardTitle>
          <CardDescription>Information about your rental contract</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarRange className="h-4 w-4" />
                Start Date
              </div>
              <p className="font-medium">
                {format(new Date(activeContract.start_date), "MMMM d, yyyy")}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarRange className="h-4 w-4" />
                End Date
              </div>
              <p className="font-medium">
                {format(new Date(activeContract.end_date), "MMMM d, yyyy")}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Monthly Rent
              </div>
              <p className="font-medium">
                ${activeContract.monthly_rent.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Contract Status</p>
                <Badge 
                  variant={activeContract.contract_status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {activeContract.contract_status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Room</p>
                <p>Room {activeContract.room.room_number}, Floor {activeContract.room.floor.name}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Building</p>
                <p>{activeContract.room.floor.building.name}</p>
              </div>
            </div>
          </div>
        </CardContent>
        
        {activeContract.file_url && (
          <CardFooter className="border-t pt-6">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(getFullFileUrl(activeContract.file_url), '_blank')}
            >
              <Download className="h-4 w-4" />
              View Contract Document
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
} 