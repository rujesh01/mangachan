// columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MangaChapter } from "@/types/types";

export const columns: ColumnDef<MangaChapter>[] = [
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => row.original.language.toUpperCase(),
  },
  {
    accessorKey: "chapter",
    header: "Chapter",
    cell: ({ row }) => row.original.chapter || "N/A",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.original.title || "Untitled",
  }
];
