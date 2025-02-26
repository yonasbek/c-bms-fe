'use client'
import React from 'react'
import { Dialog, DialogHeader } from './ui/dialog'
import { DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useModalStore } from '@/store/modal'
import CreateBuildingModal from './dialogs/create-building-modal'

const CustomModal = () => {
  
    const {modal,setIsOpen,} = useModalStore();
    let renderModal=<></>
    if(modal.name === 'create-building') 
      {
        renderModal=<CreateBuildingModal></CreateBuildingModal>}
    
  return (
    <Dialog open={modal.isOpen} onOpenChange={setIsOpen}>
        {renderModal}
    </Dialog>
  )
  
}

export default CustomModal