import { RoomType } from "./room";

export interface FloorType {
    id: string;
    name: string;
    buildingId:string;
    createdAt: string;
    updatedAt: string;
}

export interface FloorWithRooms extends FloorType {
    rooms: RoomType[];
  }

