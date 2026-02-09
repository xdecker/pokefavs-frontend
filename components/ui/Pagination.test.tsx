import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Pagination } from "./Pagination";

// 🔹 Mocks
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    toString: () => "search=pikachu",
  }),
}));

describe("Pagination", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("renders page info correctly", () => {
    render(<Pagination currentPage={2} totalPages={10} />);

    expect(screen.getByText("Page 2 / 10")).toBeInTheDocument();
  });

  it("disables First & Prev on page 1", () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByText("⏮ First")).toBeDisabled();

    expect(screen.getByText("◀ Prev")).toBeDisabled();
  });

  it("disables Next & Last on final page", () => {
    render(<Pagination currentPage={5} totalPages={5} />);

    expect(screen.getByText("Next ▶")).toBeDisabled();

    expect(screen.getByText("Last ⏭")).toBeDisabled();
  });

  it("navigates to next page", () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    fireEvent.click(screen.getByText("Next ▶"));

    expect(pushMock).toHaveBeenCalledWith("/?search=pikachu&page=3");
  });

  it("navigates to previous page", () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    fireEvent.click(screen.getByText("◀ Prev"));

    expect(pushMock).toHaveBeenCalledWith("/?search=pikachu&page=2");
  });

  it("navigates to first page", () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    fireEvent.click(screen.getByText("⏮ First"));

    expect(pushMock).toHaveBeenCalledWith("/?search=pikachu&page=1");
  });

  it("navigates to last page", () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    fireEvent.click(screen.getByText("Last ⏭"));

    expect(pushMock).toHaveBeenCalledWith("/?search=pikachu&page=5");
  });
});
