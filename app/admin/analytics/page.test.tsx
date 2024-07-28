import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Analytics from "./page";

// Temporary solution until recharts release fix for minWidth / minHeight
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: (props: Record<string, unknown>) => <div {...props} />,
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Analytics", () => {
  it("renders a heading", () => {
    render(<Analytics />);
  });
});
