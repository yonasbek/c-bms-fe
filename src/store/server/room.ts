// export const useCreateFloor = () => {
//     const queryClient = useQueryClient();

import { userRequest } from "@/lib/requests";
import { RoomType } from "@/types/room";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


interface CreateRoomData {
    name: string;
    floorId: string;
    room_number: string;
    room_size: string;
    room_status: string;
    description: string;
}
  
//     return useMutation({
//       mutationFn: (data: CreateFloorData) => {
//         return userRequest.post<FloorType>("/floor", data)},
//       onSuccess: (data) => {
//         console.log('Floor created successfully', data);
//         toast.success("Floor created successfully");
//         queryClient.invalidateQueries({ queryKey: ['floors'] });
//         queryClient.invalidateQueries({ queryKey: ['building', data.data.buildingId] });
//       },
//       onError: (error) => {
//         console.error('Floor creation failed:', error);
//         toast.error("Failed to create floor");
//       }
//     });
//   };

export const useCreateRoom = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateRoomData) => {
            return userRequest.post<RoomType>("/room", data)},
        onSuccess: (data) => {
            toast.success("Room created successfully");
            queryClient.invalidateQueries({ queryKey: ['roomsInFloor', data.data.floorId], exact: true });
            queryClient.invalidateQueries({ queryKey: ['floor', data.data.floorId], exact: true });
        },
    });
}