"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { AddFloorDialog } from "./add-floor-dialog"
import { AddRoomDialog } from "./add-room-dialog"
import { useGetAllFloorsRoomsForBuilding } from "@/store/server/floor"
import { useBuildingStore } from "@/store/buildings"
import GlobalLoading from "@/components/global-loading"
import { FloorWithRooms } from "@/types/floor"

// // Dummy data - replace with actual data fetching
// const floors = [
//   {
//     id: "1",
//     name: "Floor 1",
//     rooms: [
//       { id: "101", number: "101", status: "occupied", tenant: "John Doe" },
//       { id: "102", number: "102", status: "vacant", tenant: null },
//       { id: "103", number: "103", status: "occupied", tenant: "Jane Smith" },
//       { id: "104", number: "104", status: "maintenance", tenant: null },
//     ],
//   },
//   {
//     id: "2",
//     name: "Floor 2",
//     rooms: [
//       { id: "201", number: "201", status: "occupied", tenant: "Alice Johnson" },
//       { id: "202", number: "202", status: "occupied", tenant: "Bob Wilson" },
//       { id: "203", number: "203", status: "vacant", tenant: null },
//       { id: "204", number: "204", status: "occupied", tenant: "Carol Brown" },
//     ],
//   },
// ]



export function FloorsList() {
const {activeBuilding} = useBuildingStore();

// const {data,isLoading} = useGetFloorsForBuilding(activeBuilding?.id);
const {data:floors,isLoading } = useGetAllFloorsRoomsForBuilding(activeBuilding?.id);

// const {data:rooms} = useGetRoomsForFloor(activeBuilding?.id);

if(isLoading){
  return <GlobalLoading title="Floors"/>
}


  return (
    <div className="space-y-4">
      {floors.map((floor,index) => (
        <FloorItem key={index+floor.id} floor={floor} />
      ))}
      <AddFloorDialog />
    </div>
  )
}

/**
 * 
 * 
: 
{id: 22, created_at: '2025-03-03T07:57:33.045Z', modified_at: '2025-03-03T07:57:33.045Z', is_active: true, name: 'Building AA', …}
buildingId
: 
22
created_at
: 
"2025-03-03T12:14:23.136Z"
id
: 
15
is_active
: 
true
modified_at
: 
"2025-03-03T12:14:23.136Z"
name
: 
"BMW"
rooms
: 
[]
 * @returns 
 */

function FloorItem({ floor }: { floor: FloorWithRooms }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
            <div className="flex items-center gap-2">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <h3 className="font-semibold">{floor.name}</h3>
              <Badge variant="outline">{floor.rooms.length} Rooms</Badge>
            </div>
            <AddRoomDialog floorId={floor.id} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 pt-0 grid gap-2">
            {floor.rooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Room {room.room_number}</span>
                  <Badge
                    variant={
                      room.room_status === "occupied" ? "default" : room.room_status === "vacant" ? "secondary" : "destructive"
                    }
                  >
                    {room.room_status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{room.room_number || "No tenant"}</div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

