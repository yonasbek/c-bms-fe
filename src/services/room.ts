export const roomService = {
  createRoom: async (data: {
    floor_id: number;
    room_number: string;
    room_status: "occupied" | "vacant" | "maintenance";
    room_size: number;
  }) => {
    const response = await api.post("/rooms", data);
    return response.data;
  },
  // ... rest of the service
}; 