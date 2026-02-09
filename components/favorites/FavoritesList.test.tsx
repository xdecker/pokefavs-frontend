import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoritesList } from "./FavoritesList";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("../ui/EmptyListMessage", () => ({
  EmptyListMessage: ({ message }: any) => <p>{message}</p>,
}));

vi.mock("./FavoritesSummary", () => ({
  FavoritesSummary: () => <div>SUMMARY COMPONENT</div>,
}));

// 🔹 Zustand store mock
vi.mock("@/stores/favorites/favorites.store", () => ({
  useFavoritesStore: vi.fn(),
}));

import { useFavoritesStore } from "@/stores/favorites/favorites.store";

describe("FavoritesList", () => {
  const removeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows empty message when no favorites", () => {
    (useFavoritesStore as any).mockImplementation((selector: any) =>
      selector({
        favorites: [],
        removeFavorite: removeMock,
      })
    );

    render(<FavoritesList />);

    expect(
      screen.getByText("Your favorites list is empty.")
    ).toBeInTheDocument();
  });

  it("renders favorites list", () => {
    (useFavoritesStore as any).mockImplementation((selector: any) =>
      selector({
        favorites: [
          { id: "25", name: "pikachu" },
          { id: "1", name: "bulbasaur" },
        ],
        removeFavorite: removeMock,
      })
    );

    render(<FavoritesList />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();

    // Summary existe
    expect(screen.getByText("SUMMARY COMPONENT")).toBeInTheDocument();
  });

  it("calls removeFavorite when trash button is clicked", () => {
    (useFavoritesStore as any).mockImplementation((selector: any) =>
      selector({
        favorites: [{ id: "25", name: "pikachu" }],
        removeFavorite: removeMock,
      })
    );

    render(<FavoritesList />);

    const btn = screen.getByRole("button");

    fireEvent.click(btn);

    expect(removeMock).toHaveBeenCalledWith("25");
  });

  it("renders pokemon images", () => {
    (useFavoritesStore as any).mockImplementation((selector: any) =>
      selector({
        favorites: [{ id: "25", name: "pikachu" }],
        removeFavorite: removeMock,
      })
    );

    render(<FavoritesList />);

    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", expect.stringContaining("/25.svg"));
  });
});
