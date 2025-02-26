import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useModalStore } from '@/store/modal'

const CreateBuildingModal = () => {
    const {modal,setIsOpen,} = useModalStore();
  return (
    <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add New Building</DialogTitle>
      <DialogDescription>
        Enter the details of the new building. You can add floors and rooms after creating the building.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Building Name</Label>
        <Input id="name" placeholder="Enter building name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter building address" />
      </div>
      
    </div>
    <div className="flex justify-end gap-3">
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button>Create Building</Button>
    </div>
  </DialogContent>
  )
}

export default CreateBuildingModal