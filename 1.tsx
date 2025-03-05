"use client";

import React, { useState, useEffect } from "react";
import { ViewFrame } from "../view_frame/page";
import { DateRangeFrame } from "../dateRange_frame/page";
import { RegionFrame } from "../region_frame/page";
import { CountryFrame } from "../country_frame/page";
import { ModelNameFrame } from "../modelName_frame/page";
import { SegmentFrame } from "../segment_frame/page";
import { ScopeFrame } from "../scope_frame/page";

// Define type for selectedOptions
interface SelectedOptions {
  view: string;
  dateRange: string;
  region: string;
  country: string;
  modelName: string;
  segment: string;
  scope: string;
}

const ControlPanel: React.FC = () => {
  // Use the type for state
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    view: "DRMS",
    dateRange: "2023 Q3",
    region: "Europe",
    country: "Germany",
    modelName: "XYZ-789",
    segment: "Finance",
    scope: "Regional",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    console.log("Current selections:", selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (!isCollapsed) {
      setTimeout(() => setShowComponents(true), 200);
    } else {
      setShowComponents(false);
    }
  }, [isCollapsed]);

  const selectedOptionsArray = Object.values(selectedOptions);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-100 hover:shadow-lg flex flex-col p-4 transition-all duration-300">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute left-[-10px] top-8 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-blue-600 transition"
        >
          {isCollapsed ? "→" : "←"}
        </button>

        {!isCollapsed && (
          <div className={`space-y-6 transition-opacity duration-300 ${showComponents ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Control Panel</h3>

            {/* Pass typed props */}
            <ViewFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <DateRangeFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <RegionFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <CountryFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <ModelNameFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <SegmentFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <ScopeFrame selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;


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

// Define props type
interface ViewFrameProps {
  selectedOptions: { view: string };
  setSelectedOptions: React.Dispatch<React.SetStateAction<{ view: string }>>;
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
                      ...prev,
                      view: framework.value,
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
