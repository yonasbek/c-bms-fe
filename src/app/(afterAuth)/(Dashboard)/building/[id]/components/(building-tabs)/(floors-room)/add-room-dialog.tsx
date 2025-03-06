"use client";

import type React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateRoom } from "@/store/server/room";
import { toast } from "sonner";


const formSchema = z.object({
  room_number: z.string().min(1, "Room number is required"),
  name: z.string().optional(),
  description: z.string().optional(),
  room_size: z.string().optional(),
});

type AddRoomDialogProps = {
  floorId: string;
  trigger?: React.ReactNode;
};

export function AddRoomDialog({ floorId, trigger }: AddRoomDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateRoom();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_number: "",
      name: "",
      room_size: "",
      description: "",
    },
  });

  // Separate submit handler for debugging
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    try {
      await mutation.mutateAsync({
        floorId,
        name: data.room_number,
        room_number: data.room_number,
        room_status: 'vacant',
        room_size: data.room_size || "",
        description: data.description || "",
      });
      
      toast.success("Room created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Mutation error:', error);
      toast.error("Failed to create room");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Add a new room to the floor. Specify room details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {/* Important: Use e.preventDefault() and form.handleSubmit(onSubmit) */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }} 
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="room_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. 101" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="room_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add any additional details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={mutation.isPending}
                onClick={() => console.log('Submit button clicked')}
              >
                {mutation.isPending ? "Creating..." : "Create Room"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
