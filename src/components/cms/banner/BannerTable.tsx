"use client";

import * as React from "react";
import Image from "next/image";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { 
  Pencil, 
  Trash2, 
  ArrowUpDown,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useQueryState, parseAsString, parseAsInteger, parseAsJson } from "nuqs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
  status: "Active" | "Inactive";
};

const mockData: Banner[] = [
  {
    id: "1",
    title: "Ibadah Minggu",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCvv5Pf5sVQeZx9U61dtXfpgdwQpjyBKWxR9fziNIltFAD0Y1JFnsvtRrbLd6le7PqE4OBxPQxwQxeL9wjqhUisCaqs6_ZS-FqzjH_2sKEuWBJveHvKhGAJUWo6Ks6MCNFQ8u7yRqoXuTYv9AmnOnYULW_igMWG3-kfmlfiON5XOIGnCZ2CxE8rE5E2aWWPDgk1AHsszdCzvjieK17Bu8uTdirSDeJnINFXfVAFVbPdjeAOG0jYUnGiNoqnjKzrFApDyb6Waob3Io4",
    order: 1,
    status: "Active",
  },
  {
    id: "2",
    title: "Paskah 2024",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH8hbZ9nqToUHf26uJaKC8mqgz4liACxltaJOvC8Mq3UOY6eHrSWz-fLMck7c4hJQH6bX-0IDNB7xy2p3HBuNL-YNKrxxLDv-fiwuzSfaFBY1-0qMH1sRuN9Qeu1K40K1Wg9Pl-j7NgMYF3iYAqTBzQNEw5aVRx1JDUwXDwfMPKrWkAFY2hTrs28NHIc_AhdYeOCbQbtlaTPH_6cUutK2Xsp174jM10wUICw481wGsBUhAdEWkNLRpi5VSplxtc1cucvWJGHybOrv4",
    order: 2,
    status: "Active",
  },
  {
    id: "3",
    title: "Retreat",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDyxxMb5xAnZ2Foe5EYevVLZZKmmP34_j0mYsUcA3GGDdJ0XJG0mIEUs-mm6hfiL7m7Z86omxsI6PYb0E17enXDDSzZ_Jxbdk_fKz1cjCNSbr57HvfeW4dZHlerJpxfPCnneDZURhWjfkvBjnVYaElLB4QjjspN-d-Ab4bMzvblukp4ukAFjRvjbnTdU3ZSbs2_cCU8tTEt5Q3hZxycCB__oeyUtG3yiPz56Jch_16ysF_0-bL32Axu94BrhCajHfsGKSPxmD19rY0",
    order: 3,
    status: "Inactive",
  },
];

interface BannerTableProps {
  onEdit: (banner: Banner) => void;
  onDelete: (banner: Banner) => void;
  onAdd: () => void;
}

export function BannerTable({ onEdit, onDelete, onAdd }: BannerTableProps) {
  // nuqs URL State
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [status, setStatus] = useQueryState("status", parseAsString.withDefault("all").withOptions({ shallow: false }));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1).withOptions({ shallow: false }));
  const [sort, setSort] = useQueryState<SortingState>("sort", 
    parseAsJson<SortingState>().withDefault([]).withOptions({ shallow: false })
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Banner>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px] border-slate-300"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] border-slate-300"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "imageUrl",
      header: "Gambar",
      cell: ({ row }) => (
        <div className="relative h-14 w-24 overflow-hidden rounded border border-slate-200 bg-slate-50">
          <Image
            src={row.getValue("imageUrl")}
            alt={row.getValue("title")}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4 h-8 text-slate-500 font-semibold text-xs uppercase tracking-wider hover:bg-transparent"
          >
            Judul
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium text-slate-900">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusVal = row.getValue("status") as string;
        const isActive = statusVal === "Active";
        return (
          <Badge
            className={cn(
              "rounded px-2 py-0.5 text-[11px] font-semibold border-none shadow-none uppercase tracking-wider",
              isActive 
                ? "bg-[#38A169]/10 text-[#38A169] hover:bg-[#38A169]/10" 
                : "bg-[#DD6B20]/10 text-[#DD6B20] hover:bg-[#DD6B20]/10"
            )}
          >
            {isActive ? "Aktif" : "Nonaktif"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "order",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4 h-8 text-slate-500 font-semibold text-xs uppercase tracking-wider hover:bg-transparent"
          >
            No Urut
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="text-slate-500">{row.getValue("order")}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => {
        const banner = row.original;

        return (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => onEdit(banner)}
              className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-50 transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(banner)}
              className="p-1.5 text-slate-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // Derived filters for the table
  const columnFilters = React.useMemo(() => {
    const filters: ColumnFiltersState = [];
    if (search) filters.push({ id: "title", value: search });
    if (status && status !== "all") filters.push({ id: "status", value: status === "Active" ? "Active" : "Inactive" });
    return filters;
  }, [search, status]);

  const pagination: PaginationState = React.useMemo(() => ({
    pageIndex: page - 1,
    pageSize: 10,
  }), [page]);

  const table = useReactTable({
    data: mockData,
    columns,
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sort) : updater;
      setSort(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(pagination) : updater;
      setPage(next.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: sort,
      columnFilters,
      pagination,
      rowSelection,
    },
    manualPagination: false, // Set to true if fetching from API
  });

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari banner..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 h-10 bg-white border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">Status:</span>
            <Select 
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-full sm:w-40 h-10 bg-white border-slate-200 rounded-lg">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Active">Aktif</SelectItem>
                <SelectItem value="Inactive">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/80 border-b border-slate-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="h-12 px-4 text-slate-500 font-semibold text-xs uppercase tracking-wider">
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
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-slate-400">
                    Data tidak ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            Showing {table.getRowModel().rows.length} of {mockData.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 border-slate-200 text-slate-400 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "h-8 min-w-[32px] text-xs border-none",
                  page === p 
                    ? "bg-[#1A365D] hover:bg-[#1A365D]/90 text-white" 
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                )}
              >
                {p}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 border-slate-200 text-slate-400"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
