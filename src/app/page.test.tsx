import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Home from "@/app/page";
import { photos } from "@/lib/photos";

test("renders a heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Photo Store" }),
  ).toBeDefined();
});

test("renders exactly as many photo links as seeded photos", () => {
  render(<Home />);
  expect(screen.getAllByRole("link")).toHaveLength(photos.length);
});

test("each link points at its photo's detail page and shows its title/image", () => {
  render(<Home />);
  const links = screen.getAllByRole("link");
  const hrefs = links.map((link) => link.getAttribute("href"));

  for (const photo of photos) {
    expect(hrefs).toContain(`/photo/${photo.slug}`);

    const link = links.find(
      (candidate) =>
        candidate.getAttribute("href") === `/photo/${photo.slug}`,
    )!;
    expect(
      within(link).getByRole("heading", { level: 2, name: photo.title }),
    ).toBeDefined();
    expect(within(link).getByAltText(photo.title)).toBeDefined();
  }
});
