"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import Image from "next/image";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
            table.getRowModel().rows.map((row) => {
              // @ts-ignore
              const isVerified = row.original.isVerified;
              // @ts-ignore
              const id = row.original.id;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {cell.getContext().column.id === "image" ? (
                          <div className="">
                            <Image
                              src={cell.getContext().getValue() as string}
                              alt=""
                              height={48}
                              width={48}
                              className="rounded-sm"
                            />
                          </div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}

                        {cell.getContext().column.id === "action" &&
                          !isVerified && (
                            <button
                              type="button"
                              onClick={() => {
                                const data = { projectId: id };
                                axios
                                  .post("/api/admin", data)
                                  .then((res) => {
                                    console.log("Res", res);
                                    toast.success(
                                      "Successful Verification done"
                                    );
                                  })
                                  .catch((error: AxiosError) => {
                                    console.log(
                                      "Error while verifying project"
                                    );
                                    toast.error("Project verification failed");
                                  })
                                  .finally(() => {});
                              }}
                              className="py-2 px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
                            >
                              Verify
                            </button>
                          )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
