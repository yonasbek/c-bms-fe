//mutiate floor create 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userRequest } from "@/lib/requests";
import { toast } from "sonner";
import { FloorType } from "@/types/floor";

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

