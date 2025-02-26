import { BuildingsTable } from "./buildings-table";
import { CreateBuildingButton } from "./create-building-button";


export default function BuildingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Buildings</h2>
        <CreateBuildingButton />
      </div>

      <BuildingsTable />
    </div>
  )
}

