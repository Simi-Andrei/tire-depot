"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "../ui/data-table-column-toggle";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { getDropDownValues } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { deleteEntryHandler } from "@/lib/entryRoutes/entryRoutes";

export const columns = [
  {
    header: "No.",
    id: "id",
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) +
      1 +
      ".",
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="focus-visible:ring-transparent duration-0 rounded-[2px] mx-auto flex"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="focus-visible:ring-transparent duration-0 rounded-[2px] mx-auto flex"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerLastname",
    header: ({ column }) => {
      return (
        <Button
          className="px-0 focus-visible:ring-transparent duration-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last name
          <ArrowUpDown className="ml-2 h-4 w-4 text-cyan-600" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customerFirstname",
    header: ({ column }) => {
      return (
        <Button
          className="px-0 focus-visible:ring-transparent duration-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First name
          <ArrowUpDown className="ml-2 h-4 w-4 text-cyan-600" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "expired",
    header: ({ column }) => {
      return (
        <Button
          className="px-0 focus-visible:ring-transparent duration-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expired
          <ArrowUpDown className="ml-2 h-4 w-4 text-cyan-600" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expired = row.getValue("expired");
      if (expired) {
        return <p>Yes</p>;
      }
      return <p>No</p>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "periodInMonths",
    header: ({ column }) => {
      return (
        <Button
          className="px-0 focus-visible:ring-transparent duration-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Months
          <ArrowUpDown className="ml-2 h-4 w-4 text-cyan-600" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="px-0 focus-visible:ring-transparent duration-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4 text-cyan-600" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price");
      return `$${price}`;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entry = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-transparent duration-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(entry._id)}
            >
              Copy entry ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/entries/${entry._id}`}>View entry</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="p-0 h-5"
                variant="ghost"
                onClick={() => deleteEntryHandler(entry._id)}
              >
                Delete entry
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const EntriesDataTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex items-center py-2">
        <Input
          placeholder="Search last name..."
          value={table.getColumn("customerLastname")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table
              .getColumn("customerLastname")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-xs h-8 rounded-sm"
        />
        <div className="ml-2">
          {table.getColumn("periodInMonths") && (
            <DataTableFacetedFilter
              column={table.getColumn("periodInMonths")}
              title="Months"
              options={getDropDownValues(data, "periodInMonths")}
            />
          )}
        </div>
        <div className="ml-2">
          {table.getColumn("expired") && (
            <DataTableFacetedFilter
              column={table.getColumn("expired")}
              title="Expired"
              options={getDropDownValues(data, "expired")}
            />
          )}
        </div>
        <div className="ml-2">
          {table.getColumn("price") && (
            <DataTableFacetedFilter
              column={table.getColumn("price")}
              title="Price"
              options={getDropDownValues(data, "price")}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="link"
            onClick={() => table.resetColumnFilters()}
            className="w-24 p-2 ml-2"
          >
            Clear filters
          </Button>
        )}

        <DataTableViewOptions table={table} />
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="[&>*:nth-child(6)]:text-right [&>*:nth-child(7)]:text-right"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="[&:not(:first-child)]:px-1 text-left bg-slate-200 text-black first:text-right"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="[&>*:nth-child(6)]:text-right [&>*:nth-child(7)]:text-right"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="py-1 [&:not(:first-child)]:px-1 text-left first:w-10 first:text-right last:text-center"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
};

export default EntriesDataTable;
