import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserCard } from "@/components/user/UserCard";
import { mockUser } from "@/test/mocks";

function renderUserCard() {
  return render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <UserCard user={mockUser} />
    </MemoryRouter>,
  );
}

describe("UserCard", () => {
  it("renders user name", () => {
    renderUserCard();
    expect(screen.getByText("Linus Torvalds")).toBeInTheDocument();
  });

  it("renders user login", () => {
    renderUserCard();
    expect(screen.getByText("@torvalds")).toBeInTheDocument();
  });

  it("renders user bio", () => {
    renderUserCard();
    expect(screen.getByText("Creator of Linux and Git")).toBeInTheDocument();
  });

  it("renders follower count", () => {
    renderUserCard();
    // 232000 -> 232.0k
    expect(screen.getByText("232.0k")).toBeInTheDocument();
  });

  it("renders following count", () => {
    renderUserCard();
    // following: 0
    const followingLabel = screen.getByText("seguindo");
    expect(followingLabel).toBeInTheDocument();
  });

  it("renders public repos count", () => {
    renderUserCard();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders location when available", () => {
    renderUserCard();
    expect(screen.getByText("Portland, OR")).toBeInTheDocument();
  });

  it("renders a link to GitHub profile", () => {
    renderUserCard();
    const link = screen.getByRole("link", { name: /ver no github/i });
    expect(link).toHaveAttribute("href", "https://github.com/torvalds");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render email when null", () => {
    renderUserCard();
    expect(
      screen.queryByRole("link", { name: /e-mail/i }),
    ).not.toBeInTheDocument();
  });
});
