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

export type News = {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: "Berita" | "Renungan" | "Artikel";
  status: "Published" | "Draft";
};

const mockData: News[] = [
  {
    id: "1",
    title: "Renungan Pagi: Kasih Kristus",
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZwh2Ohc10tsBPe8-ZgQvLmDWiA9yeuVlk1D1AurhyjRWFCydS2nU-Ts2j5Geh9ag2QfWB83wePFIYIm-14u3Tw2fQxcplenh2zCk0aAVN8_iGc2NIP509cWAoghzn2WQbYHwdb8q5ZWxTAvhQMaMxdkdpg0QZSqHUYF0b6YtEkgt-K41X4N_Hy9z9KvwjRcW7AlsFRkeXSespCFszdYBv5jr3xAr8yiDpdKZ0zPo3N49zXxtINmQMmZev7ls5k48q5fV5NK9cTZtx",
    category: "Renungan",
    status: "Published",
  },
  {
    id: "2",
    title: "Jadwal Natal 2023",
    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKswkFPPc8oCN8SH-LgAxI2YMSZdF-syQjOmnlUQcTl2ZT9qor3sffviY5zqKa9E185SPGNT23URv_UUluGDe-7Xu1hb__tDxi077ujvpusvrwgXYXdGhJ9TP3bWte3orrQm9RKZOoTWkkujITifdnEaPURnvMFmHxwkxx-lxulvzOVC0GzuiPWK1muyjENx9Yv9XTzmxloj4VRQK7STItbyEsRdpI7V6YdVITNhszqQh4_Zui4JgTvAYj-apJX0m6i4pGOLFjJPuW",
    category: "Berita",
    status: "Draft",
  },
];

interface NewsTableProps {
  onEdit: (news: News) => void;
  onDelete: (news: News) => void;
}

export function NewsTable({ onEdit, onDelete }: NewsTableProps) {
  // nuqs URL State
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [category, setCategory] = useQueryState("category", parseAsString.withDefault("all").withOptions({ shallow: false }));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1).withOptions({ shallow: false }));
  const [sort, setSort] = useQueryState<SortingState>("sort", 
    parseAsJson<SortingState>().withDefault([]).withOptions({ shallow: false })
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<News>[] = [
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
      accessorKey: "thumbnailUrl",
      header: "Thumbnail",
      cell: ({ row }) => (
        <div className="relative h-12 w-16 overflow-hidden rounded border border-slate-200 bg-slate-50">
          <Image
            src={row.getValue("thumbnailUrl")}
            alt={row.getValue("title")}
            fill
            sizes="64px"
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
      accessorKey: "category",
      header: "Kategori",
      cell: ({ row }) => <div className="text-slate-500">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusVal = row.getValue("status") as string;
        const isPublished = statusVal === "Published";
        return (
          <Badge
            className={cn(
              "rounded-full px-3 py-0.5 text-[11px] font-semibold border shadow-none",
              isPublished 
                ? "bg-[#E6F4EA] text-[#1E8E3E] border-[#CEEAD6] hover:bg-[#E6F4EA]" 
                : "bg-[#FEF7E0] text-[#E37400] border-[#FCE8B2] hover:bg-[#FEF7E0]"
            )}
          >
            {statusVal}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => {
        const news = row.original;

        return (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={() => onEdit(news)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(news)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
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
    if (category && category !== "all") filters.push({ id: "category", value: category });
    return filters;
  }, [search, category]);

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
    manualPagination: false,
  });

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select 
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="w-full sm:w-48 h-10 bg-white border-slate-200 rounded-lg">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Berita">Berita</SelectItem>
                <SelectItem value="Renungan">Renungan</SelectItem>
                <SelectItem value="Artikel">Artikel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari berita..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 h-10 bg-white border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
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
            Menampilkan {table.getRowModel().rows.length} dari {mockData.length} data
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
