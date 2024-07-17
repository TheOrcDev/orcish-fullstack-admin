"use client";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { trpc } from "@/server/client";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 10;

export default function Users() {
  const searchParams = useSearchParams();

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE);
  const totalItems = +(searchParams.get("totalItems") ?? DEFAULT_TOTAL_ITEMS);

  const users = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
  });

  return (
    <Card className="m-10">
      <CardHeader className="px-7">
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Username</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.isPending &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  <TableCell width={"40%"}>
                    <div className="p-5 bg-gray-400/30 rounded-xl"></div>
                  </TableCell>
                  <TableCell>
                    <div className="p-5 bg-gray-400/30 rounded-xl"></div>
                  </TableCell>
                  <TableCell>
                    <div className="p-5 bg-gray-400/30 rounded-xl"></div>
                  </TableCell>
                  <TableCell>
                    <div className="p-5 bg-gray-400/30 rounded-xl"></div>
                  </TableCell>
                </TableRow>
              ))}
            {users.data?.items.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="hidden md:inline">
                  <div className="text-sm text-muted-foreground">{user.id}</div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.username}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {user.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/admin/users?page=${
                    page - 1
                  }&totalItems=${totalItems}`}
                />
              </PaginationItem>
            )}

            {Array.from({ length: users.data?.totalPages ?? 1 }).map(
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`/admin/users?page=${
                      index + 1
                    }&totalItems=${totalItems}`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            {users.data?.totalPages !== page && (
              <PaginationItem>
                <PaginationNext
                  href={`/admin/users?page=${
                    page + 1
                  }&totalItems=${totalItems}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
