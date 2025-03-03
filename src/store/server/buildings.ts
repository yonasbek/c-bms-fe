import { userRequest } from "@/lib/requests";
import { BuildingType } from "@/types/building";
import { useQuery } from "@tanstack/react-query";

const getBuildingInfo = async (buildingID: string) => {
  const response = await userRequest(`/building/${buildingID}`);
  return response.data;
};

// Convert to a proper React hook by naming it with "use" prefix
export const useGetBuildings = () => {
  return useQuery<BuildingType[]>({
    queryKey: ['buildings'],
    queryFn: async () => {
      const response = await userRequest.get('/building');
      return response.data;
    },
   
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0
  });
};

export const useGetBuildingInfo = (buildingID: string) => {
    return useQuery<BuildingType>({
    queryKey: ["building", buildingID],
    queryFn: () => getBuildingInfo(buildingID),
   
  });
};
