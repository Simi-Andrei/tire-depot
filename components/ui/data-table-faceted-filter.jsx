import { Button } from "@/components/ui/button";
import { RiFilterLine } from "react-icons/ri";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export function getDropDownValues(data, accessorKey) {
  if (accessorKey === "expired") {
    return [
      { value: "true", label: "Yes" },
      { value: "false", label: "No" },
    ];
  }

  const uniqueValues = new Set(data.map((item) => item[accessorKey]));
  return Array.from(uniqueValues).map((value) => ({
    value,
    label: value.toString(),
  }));
}

export function DataTableFacetedFilter({ column, title, options }) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue());

  const getLabel = (value) => {
    if (column.id === "expired") {
      return value === true ? "Yes" : "No";
    }
    return value;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed rounded-sm"
        >
          <RiFilterLine className="w-4 h-4 mr-2" />
          {title}
          {selectedValues?.size > 0 && (
            <div className="space-x-1 lg:flex">
              {options
                .filter((option) => selectedValues.has(option.value))
                .map((option) => (
                  <Badge
                    key={option.value}
                    className="px-1 mx-1.5 font-normal rounded-sm bg-slate-600"
                  >
                    {getLabel(option.value)}
                  </Badge>
                ))}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div className="mr-6 text-lg">
                      {isSelected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    </div>
                    <span>{getLabel(option.value)}</span>
                    {facets?.get(option.value) && (
                      <span className="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
