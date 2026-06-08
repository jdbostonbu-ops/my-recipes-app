import { test, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    recipe: {
      findMany: vi.fn(),
    },
  },
}));

import { GET } from "./route.js";
import { prisma } from "@/lib/prisma";

beforeEach(() => {
  vi.clearAllMocks();
});

function makeRequest(url = "http://localhost/api/recipes") {
  return new Request(url);
}

test("returns recipes when the DB has them", async () => {
  prisma.recipe.findMany.mockResolvedValue([
    { id: 1, title: "Pancakes", category: "breakfast", createdAt: new Date("2026-01-01") },
  ]);

  const response = await GET(makeRequest());
  const data = await response.json();

  expect(data).toHaveLength(1);
  expect(data[0].title).toBe("Pancakes");
});

test("returns an empty array when the DB is empty", async () => {
  prisma.recipe.findMany.mockResolvedValue([]);

  const response = await GET(makeRequest());
  const data = await response.json();

  expect(data).toEqual([]);
});

test("orders recipes by date descending", async () => {
  prisma.recipe.findMany.mockResolvedValue([]);

  await GET(makeRequest());

  expect(prisma.recipe.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      orderBy: { createdAt: "desc" },
    })
  );
});