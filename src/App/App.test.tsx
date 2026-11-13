// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { App } from "./App";

vi.mock("../services/runs", async () => {
  const { runs } = await import("../data/runs");
  return { getRuns: vi.fn(async () => runs) };
});

const showModal = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  "showModal",
);
const close = Object.getOwnPropertyDescriptor(
  HTMLDialogElement.prototype,
  "close",
);

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});

afterAll(() => {
  if (showModal) {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", showModal);
  } else {
    Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  }
  if (close) {
    Object.defineProperty(HTMLDialogElement.prototype, "close", close);
  } else {
    Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
  }
});

beforeEach(() => {
  window.history.replaceState({}, "", "/");
});

afterEach(cleanup);

describe("runs page", () => {
  it("filters runs by status", async () => {
    render(<App />);
    const table = await screen.findByRole("table");

    fireEvent.click(screen.getByRole("button", { name: "Succeeded" }));

    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(
      within(table).getByRole("button", { name: "Fix checkout tests" }),
    ).toBeDefined();
    expect(
      within(table).getByRole("button", { name: "Improve API validation" }),
    ).toBeDefined();
    expect(
      within(table).queryByRole("button", { name: "Auth refactor" }),
    ).toBeNull();
    expect(window.location.search).toBe("?status=succeeded");
  });

  it("searches run names and repositories without case sensitivity", async () => {
    render(<App />);
    const table = await screen.findByRole("table");

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Search by run name or repository",
      }),
      {
        target: { value: "PAYMENTS" },
      },
    );

    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(
      within(table).getByRole("button", { name: "Fix checkout tests" }),
    ).toBeDefined();
    expect(
      within(table).getByRole("button", { name: "Add billing events" }),
    ).toBeDefined();
    expect(
      within(table).queryByRole("button", { name: "Auth refactor" }),
    ).toBeNull();
    expect(new URLSearchParams(window.location.search).get("q")).toBe(
      "PAYMENTS",
    );
  });

  it("opens the selected run's details", async () => {
    render(<App />);
    const table = await screen.findByRole("table");

    fireEvent.click(
      within(table).getByRole("button", { name: "Auth refactor" }),
    );

    const dialog = screen.getByRole("dialog", { name: "Auth refactor" });
    expect(within(dialog).getByText("run_8f2a91")).toBeDefined();
    expect(
      within(dialog).getByRole("heading", { name: "Execution logs" }),
    ).toBeDefined();
  });
});
