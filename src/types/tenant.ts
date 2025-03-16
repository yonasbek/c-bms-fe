export interface Building {
  id: number;
  name: string;
  address: string;
}

export interface TenantRoom {
  id: number;
  room_number: string;
  floor_number: number;
  room_status: string;
  building: Building;
}

export interface TenantContract {
  id: number;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  status: string;
  file_url?: string | null;
  room: {
    id: number;
    room_number: string;
    floor_number: number;
  };
  building: Building;
}

export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'rejected';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceType = 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'other';

export interface MaintenanceRequest {
  id: number;
  description: string;
  request_status: MaintenanceStatus;
  special_note?: string;
  roomId: number;
  priority?: MaintenancePriority;
  created_at: string;
  modified_at: string;
  is_active: boolean;
  room?: {
    id: number;
    room_number: string;
  };
} 