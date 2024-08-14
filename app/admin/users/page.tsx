"use client";

import React, { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/server/client";

import { UsersTable } from "@/components/features";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_ITEMS = 7;

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentSearch, setCurrentSearch] = useState<string>("");

  const page = +(searchParams.get("page") ?? DEFAULT_PAGE);
  const totalItems = +(searchParams.get("totalItems") ?? DEFAULT_TOTAL_ITEMS);
  const search = searchParams.get("search");

  const { data, isPending } = trpc.users.get.useQuery({
    page: page < 1 ? DEFAULT_PAGE : page,
    totalItems: totalItems < 1 ? DEFAULT_TOTAL_ITEMS : totalItems,
    search,
  });

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", currentSearch);

    return params.toString();
  };

  return (
    <div className="m-10 flex flex-col gap-5">
      <div className="flex gap-3 w-max">
        <Input
          value={currentSearch}
          placeholder="Search"
          onChange={(e) => setCurrentSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            router.push(pathname + "?" + handleSearch());
          }}
        >
          Search
        </Button>
      </div>
      <UsersTable
        users={data?.items ?? []}
        isLoading={isPending}
        totalPages={data?.totalPages ?? 1}
        currentPage={page}
        totalItems={totalItems}
      />
    </div>
  );
}
