import GlobalLoading from "@/components/global-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBuildingStore } from "@/store/buildings";
import { useGetFloorsForBuilding } from "@/store/server/floor";
import { Building2, Users, Home, AlertCircle } from "lucide-react"

export function BuildingOverview() {
  const {activeBuilding} = useBuildingStore();
  const {data,isLoading} = useGetFloorsForBuilding(activeBuilding?.id as string);
  const floors = data?.data;

  const totalFloors = floors?.length ||0;

  if(isLoading){
return <GlobalLoading title="Floors"/>
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Floors</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFloors}</div>
          {/* <p className="text-xs text-muted-foreground"> Total Floors</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <p className="text-xs text-muted-foreground">41 Occupied Units</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">Available for rent</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Pending maintenance</p>
        </CardContent>
      </Card>
    </div>
  )
}

