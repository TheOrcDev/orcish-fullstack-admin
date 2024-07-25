import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Users from "./page";
import { TRPCProvider } from "@/components/ui/trpc-provider";

jest.mock("next/navigation", () => {
  return {
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});

describe("Users", () => {
  it("renders", () => {
    render(
      <TRPCProvider>
        <Users />
      </TRPCProvider>
    );
  });
});
