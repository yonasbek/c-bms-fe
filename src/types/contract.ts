import { RoomType } from "./room";
import { TenantUser } from "./user";

interface ContractType {
    id: string;
    userId: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    monthly_rent: number;
    contract_status: string;
    roomId: string;
    room?:RoomType;
    user?:TenantUser;
    file_url?:string;
    created_at:string;
    modified_at:string;
    // Add other contract fields as needed
  }

export default ContractType;