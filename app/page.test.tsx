import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Orders from "./page";

describe("Orders", () => {
  it("renders a heading", () => {
    render(<Orders />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Orcish Fullstack Admin");
  });
});
