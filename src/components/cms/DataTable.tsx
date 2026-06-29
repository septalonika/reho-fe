"use client";

import { useState } from "react";
import { MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string; status?: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchPlaceholder?: string;
  searchKey?: keyof T;
}

export function DataTable<T extends { id: string; status?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchPlaceholder = "Cari…",
  searchKey,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = searchKey
    ? data.filter((row) =>
        String(row[searchKey]).toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const pages = Math.ceil(filtered.length / perPage);
  const sliced = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8"
          />
        </div>
      </div>

      {/* Double-bezel table wrapper */}
      <div className="p-[5px] rounded-[20px] bg-black/[0.03] ring-1 ring-black/[0.05] overflow-hidden">
        <div className="rounded-[calc(20px-5px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/[0.05] bg-black/[0.02]">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      "px-5 py-3 text-left text-[10px] text-gray-400 uppercase tracking-widest font-medium",
                      col.className
                    )}
                  >
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-5 py-3 w-10" />
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {sliced.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-5 py-10 text-center text-sm text-gray-400"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                sliced.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-black/[0.015] transition-colors duration-150"
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={cn("px-5 py-3.5 text-sm text-gray-700", col.className)}
                      >
                        {col.render
                          ? col.render(row)
                          : String(row[col.key as keyof T] ?? "")}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-5 py-3.5">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <button className="text-gray-400 hover:text-gray-700 p-1 rounded transition-colors">
                              <DotsThreeVertical size={16} />
                            </button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content
                              className="bg-white border border-black/[0.06] rounded-xl shadow-ambient-md py-1 min-w-[130px] z-50"
                              align="end"
                            >
                              {onEdit && (
                                <DropdownMenu.Item
                                  className="px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer outline-none rounded-lg mx-1"
                                  onSelect={() => onEdit(row)}
                                >
                                  Edit
                                </DropdownMenu.Item>
                              )}
                              {onDelete && (
                                <DropdownMenu.Item
                                  className="px-3.5 py-2 text-sm text-[#9F2F2D] hover:bg-[#FDEBEC] cursor-pointer outline-none rounded-lg mx-1"
                                  onSelect={() => onDelete(row)}
                                >
                                  Hapus
                                </DropdownMenu.Item>
                              )}
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={cn(
                "w-7 h-7 text-xs rounded-pill transition-all duration-200",
                page === i + 1
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-100"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
