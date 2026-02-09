import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoritesSummary } from "./FavoritesSummary";

// 🔹 API mock
vi.mock("@/lib/pokefavsapi", () => ({
  onSaveFavorites: vi.fn(),
}));

// 🔹 Toast mock
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// 🔹 Zustand store mock
vi.mock("@/stores/favorites/favorites.store", () => ({
  useFavoritesStore: vi.fn(),
}));

// 🔹 Modal mock
vi.mock("./ModalCodeFavorites", () => ({
  ModalCodeFavorites: ({ generatedCode, onDismiss }: any) => (
    <div>
      <span>CODE: {generatedCode}</span>
      <button onClick={onDismiss}>OK</button>
    </div>
  ),
}));

import { onSaveFavorites } from "@/lib/pokefavsapi";
import { useFavoritesStore } from "@/stores/favorites/favorites.store";
import toast from "react-hot-toast";

describe("FavoritesSummary", () => {
  const clearFavoritesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const storeState = {
      favorites: [
        { id: "25", name: "pikachu" },
        { id: "1", name: "bulbasaur" },
      ],
      clearFavorites: clearFavoritesMock,
    };

    (useFavoritesStore as any).mockImplementation((selector: any) =>
      selector(storeState)
    );

    (useFavoritesStore as any).getState = () => storeState;
  });

  it("renders total favorites", () => {
    render(<FavoritesSummary />);

    expect(screen.getByText("Total Pokemons")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls API and shows modal on success", async () => {
    (onSaveFavorites as any).mockResolvedValue({
      code: "ABC123",
    });

    render(<FavoritesSummary />);

    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      expect(onSaveFavorites).toHaveBeenCalled();
    });

    // Modal aparece
    expect(screen.getByText("CODE: ABC123")).toBeInTheDocument();

    // Toast success
    expect(toast.success).toHaveBeenCalled();
  });

  it("shows error toast if API fails", async () => {
    (onSaveFavorites as any).mockResolvedValue({
      error: "Something failed",
    });

    render(<FavoritesSummary />);

    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("clears favorites when modal is dismissed", async () => {
    (onSaveFavorites as any).mockResolvedValue({
      code: "ABC123",
    });

    render(<FavoritesSummary />);

    fireEvent.click(screen.getByText("Generate Code"));

    await waitFor(() => {
      screen.getByText("CODE: ABC123");
    });

    fireEvent.click(screen.getByText("OK"));

    expect(clearFavoritesMock).toHaveBeenCalled();
  });

  it("disables button while loading", async () => {
    (onSaveFavorites as any).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ code: "ABC123" }), 100)
        )
    );

    render(<FavoritesSummary />);

    const btn = screen.getByText("Generate Code");

    fireEvent.click(btn);

    expect(btn).toBeDisabled();
  });
});
