"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/server/client";

export default function Users() {
  const users = trpc.users.get.useQuery();

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
            {users.data?.map((user) => (
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
      </CardContent>
    </Card>
  );
}
