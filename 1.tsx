"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/UI/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover";

// Define type for props
interface ViewFrameProps {
  selectedOptions: {
    view: string;
  };
  setSelectedOptions: React.Dispatch<React.SetStateAction<{
    view: string;
    dateRange: string;
    region: string;
    country: string;
    modelName: string;
    segment: string;
    scope: string;
  }>>;
}

const frameworks = [
  { value: "DRMS", label: "DRMS" },
  { value: "Alternative", label: "Alternative" },
];

export function ViewFrame({ selectedOptions, setSelectedOptions }: ViewFrameProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {selectedOptions.view || "View"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-2">
        <Command className="bg-white">
          <CommandInput placeholder="Search Option" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() =>
                    setSelectedOptions((prev) => ({
                      ...prev, // Preserve the existing state
                      view: framework.value, // Update only the view
                    }))
                  }
                >
                  {framework.label}
                  <Check className={cn("ml-auto", selectedOptions.view === framework.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
