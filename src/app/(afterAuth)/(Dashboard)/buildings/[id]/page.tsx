import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloorsList } from "./floors-list"
import { BuildingOverview } from "./buildings-overview"

export default function BuildingDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Crystal Tower</h2>
          <p className="text-muted-foreground">123 Main St, City, Country</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Edit Building</Button>
          <Button>Add Floor</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="floors">Floors & Rooms</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <BuildingOverview />
        </TabsContent>
        <TabsContent value="floors" className="space-y-4">
          <FloorsList />
        </TabsContent>
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
              <CardDescription>View and manage maintenance requests for this building.</CardDescription>
            </CardHeader>
            <CardContent>{/* Add maintenance content */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tenants">
          <Card>
            <CardHeader>
              <CardTitle>Current Tenants</CardTitle>
              <CardDescription>View and manage tenants in this building.</CardDescription>
            </CardHeader>
            <CardContent>{/* Add tenants content */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

