import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersTable from "./users-table";

const mockUsers = [
  {
    id: "1",
    email: "warrior@orcdev.com",
    username: "Warrior",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    email: "wizard@orcdev.com",
    username: "Wizard",
    createdAt: "2023-01-02",
  },
];

describe("UsersTable", () => {
  it("renders", () => {
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

  it("renders a right heading", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Users");
  });

  it("renders table headings", () => {
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

    expect(screen.getByText("warrior@orcdev.com")).toBeInTheDocument();
    expect(screen.getByText("wizard@orcdev.com")).toBeInTheDocument();
  });

  it("renders pagination correctly", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={false}
        totalPages={3}
        currentPage={2}
        totalItems={2}
      />
    );

    expect(screen.getByRole("link", { name: /previous/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "3" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /next/i })).toBeInTheDocument();
  });

  it("renders loading", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={true}
        totalPages={2}
        currentPage={1}
        totalItems={10}
      />
    );

    expect(screen.getAllByRole("row").length).toBe(6);
  });
});
