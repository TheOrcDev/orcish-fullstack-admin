import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import UsersTable from "./users-table";

const mockUsers = [
  {
    id: "1",
    email: "user1@example.com",
    username: "user1",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    email: "user2@example.com",
    username: "user2",
    createdAt: "2023-01-02",
  },
];

describe("Users Page", () => {
  it("renders Users page", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );
  });

  it("has right title", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );

    const cardTitle = screen.getByRole("heading", { level: 3 });

    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent("Users");
  });

  it("renders table headers", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  it("renders user rows", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
  });

  test("renders pagination controls correctly", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={3}
        currentPage={2}
        totalItems={6}
      />
    );

    expect(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "3" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <UsersTable
        users={[]}
        isLoading={true}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );

    expect(screen.getAllByRole("row").length).toBe(6);
  });
});
