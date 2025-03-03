//mutiate floor create 
import { useMutation, useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { userRequest } from "@/lib/requests";
import { toast } from "sonner";
import { FloorType, FloorWithRooms } from "@/types/floor";
import { RoomType } from "@/types/room";

interface CreateFloorData {
  name: string;
  buildingId: string;
}

export const useCreateFloor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFloorData) => {
      return userRequest.post<FloorType>("/floor", data)},
    onSuccess: (data) => {
      console.log('Floor created successfully', data);
      toast.success("Floor created successfully");
      queryClient.invalidateQueries({ queryKey: ['floors'] });
      queryClient.invalidateQueries({ queryKey: ['building', data.data.buildingId] });
    },
    onError: (error) => {
      console.error('Floor creation failed:', error);
      toast.error("Failed to create floor");
    }
  });
};

export const useGetFloorsForBuilding = (buildingId: string) => {
  return useQuery({ 
    queryKey: ['floors', buildingId],
    queryFn: () => userRequest.get<FloorType[]>(`/floor/search/buildingId/${buildingId}`),
  });
};



export const useGetAllFloorsRoomsForBuilding = (buildingId: string) => {
  const floorsQuery = useGetFloorsForBuilding(buildingId);
  const floors = floorsQuery.data?.data || [];
  
  const roomQueries = useQueries({
    queries: floors.map((floor) => ({
      queryKey: ['rooms', floor.id],
      queryFn: () => userRequest.get<RoomType[]>(`/room/search/floorId/${floor.id}`),
    })),
  });

  const isLoading = floorsQuery.isLoading || roomQueries.some(query => query.isLoading);
  const isError = floorsQuery.isError || roomQueries.some(query => query.isError);
  const error = floorsQuery.error || roomQueries.find(query => query.error)?.error;

  const floorsWithRooms: FloorWithRooms[] = floors.map((floor, index) => ({
    ...floor,
    rooms: roomQueries[index]?.data?.data || []
  }));



  return {
    data: floorsWithRooms,
    isLoading,
    isError,
    error,
    refetch: async () => {
      await floorsQuery.refetch();
      await Promise.all(roomQueries.map(query => query.refetch()));
    }
  };
};

export const useGetRoomsForFloor = (floorId: string) => {
  return useQuery({ 
    queryKey: ['rooms', floorId],
    queryFn: () => userRequest.get<RoomType[]>(`/room/search/floorId/${floorId}`),
  });
};

