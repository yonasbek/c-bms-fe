import { Command as CommandPrimitive } from "cmdk"
import * as React from "react"

declare module "@/components/ui/command" {
  interface CommandProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {}
  
  export const Command: React.ForwardRefExoticComponent<CommandProps>
  export const CommandInput: React.ForwardRefExoticComponent<CommandInputProps>
  export const CommandList: React.ForwardRefExoticComponent<CommandListProps>
  export const CommandEmpty: React.ForwardRefExoticComponent<CommandEmptyProps>
  export const CommandGroup: React.ForwardRefExoticComponent<CommandGroupProps>
  export const CommandItem: React.ForwardRefExoticComponent<CommandItemProps>
  export const CommandShortcut: React.ForwardRefExoticComponent<CommandShortcutProps>
} 