"use client";

import React, { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { useSearchParams } from "next/navigation";

import { getUsers, GetUsersResponse } from "@/server/users";
import { UsersTable } from "@/components/features";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 7;

export default function Users() {
  const [users, setUsers] = useState<GetUsersResponse>({
    items: [],
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const [currentSearch, setCurrentSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalItems, setTotalItems] = useQueryState(
    "totalItems",
    parseAsInteger.withDefault(0)
  );

  const search = searchParams.get("search");

  // TODO: Remove this useEffect, use new hooks
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const users = await getUsers({
        page: page < 1 ? DEFAULT_PAGE : page,
        totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
        search,
      });
      setUsers(users);
      setIsLoading(false);
    };

    fetchUsers();
  }, [search, page, totalItems]);

  return (
    <div className="m-10 flex flex-col gap-5">
      <div className="flex justify-between gap-3 w-full">
        <div>
          <Input
            value={currentSearch}
            placeholder="Search"
            onChange={(e) => setCurrentSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => setTotalItems(parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Total Items" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <UsersTable
        users={users.items}
        isLoading={isLoading}
        totalPages={users.totalPages}
        currentPage={page}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
