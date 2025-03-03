"use client";
import React, { useEffect } from "react";
import { Dialog } from "./ui/dialog";
import { useModalStore } from "@/store/modal";
import CreateBuildingModal from "../app/(afterAuth)/(Dashboard)/building/create-building-modal";
import { useQueryClient } from "@tanstack/react-query";

const ModalContent = () => {
  const { modal } = useModalStore();
  
  if (modal.name === "create-building") {
    return <CreateBuildingModal />;
  }
  
  return null;
};

const CustomModal = () => {
  const { modal, setIsOpen } = useModalStore();
  const queryClient = useQueryClient();
  
  // Add this to log modal state changes
  useEffect(() => {
    console.log('Modal state changed:', modal);
  }, [modal]);
  
  return (
    <Dialog 
      open={modal.isOpen} 
      onOpenChange={(open) => {
        // Only allow closing if not forced open
        if (!modal.forceOpen || !open) {
          setIsOpen(open);
        }
      }}
    >
      <ModalContent />
    </Dialog>
  );
};

export default CustomModal;
