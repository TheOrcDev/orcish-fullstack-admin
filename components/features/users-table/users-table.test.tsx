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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
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
        onPageChange={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
  });

  it("renders loading", () => {
    render(
      <UsersTable
        users={mockUsers}
        isLoading={true}
        totalPages={2}
        currentPage={1}
        onPageChange={() => {}}
      />
    );

    expect(screen.getAllByRole("row").length).toBe(6);
  });
});
