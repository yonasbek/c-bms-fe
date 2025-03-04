import { userRequest } from "@/lib/requests";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ContractType from "@/types/contract";

interface CreateContractData {
  tenantId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  monthlyRent: string;
  contractFile: string | null;
}

// Get all contracts for a building
export const useGetBuildingContracts = (buildingId: string) => {
  return useQuery({
    queryKey: ["building-contracts", buildingId],
    queryFn: () => userRequest.get(`/building/${buildingId}/contracts`),
    select: (response) => response.data,
    enabled: !!buildingId,
  });
};

// Create a new contract
export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateContractData) => {
      // First create the contract
      const requestData = {
        userId: data.tenantId,
        roomId: data.roomId,
        start_date: data.startDate,
        end_date: data.endDate,
        monthly_rent: parseFloat(data.monthlyRent),
        contract_status: "active",
        file_url: null
      };

      const contract = await userRequest.post<ContractType>("/contracts", requestData);

      // Then update room status to rented
      await userRequest.patch(`/room/${data.roomId}`, {
        room_status: "rented"
      });

      return contract.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Contract created successfully");
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["building-contracts"] });
      queryClient.invalidateQueries({ queryKey: ["tenant-contract", variables.tenantId] });
      queryClient.invalidateQueries({ queryKey: ["roomsInFloor"] }); // Invalidate all room queries
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Failed to create contract:", error);
      toast.error(error.response?.data?.message || "Failed to create contract");
    },
  });
};

// Get a single contract by ID
export const useGetContract = (contractId: string) => {
  return useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => userRequest.get<ContractType>(`/contracts/${contractId}`),
    select: (response) => response.data,
    enabled: !!contractId,
  });
};

// Update contract status (e.g., terminate contract)
export const useUpdateContractStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      contractId, 
      status 
    }: { 
      contractId: string; 
      status: "active" | "terminated" | "expired" 
    }) => {
      const response = await userRequest.patch<ContractType>(
        `/contracts/${contractId}/status`,
        { status }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Contract status updated successfully");
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["building-contracts"] });
      queryClient.invalidateQueries({ queryKey: ["tenant-contract", data.userId] });
      queryClient.invalidateQueries({ queryKey: ["contract", data.id] });
      // If contract is terminated/expired, room becomes vacant
      if (data.contract_status !== "active") {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Failed to update contract status:", error);
      toast.error(error.response?.data?.message || "Failed to update contract status");
    },
  });
};
