import { DataTable } from '@/components/ui/dataTable'
import React from 'react'
import { columns } from './columns'
import sampleContractData from '@/sampleData/contractData'

const Contract = () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={sampleContractData} />
    </div>

  )
}

export default Contract