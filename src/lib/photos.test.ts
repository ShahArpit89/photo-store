import { describe, expect, test } from "vitest";
import { formatPrice, getPhotoBySlug, photos } from "@/lib/photos";

describe("getPhotoBySlug", () => {
  test("returns the matching photo", () => {
    const photo = getPhotoBySlug("mountain-sunrise");
    expect(photo?.title).toBe("Mountain Sunrise");
  });

  test("returns undefined for an unknown slug", () => {
    expect(getPhotoBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("formatPrice", () => {
  test("formats whole-dollar cent amounts", () => {
    expect(formatPrice(4500)).toBe("$45.00");
  });

  test("formats amounts with cents", () => {
    expect(formatPrice(999)).toBe("$9.99");
  });

  test("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});

test("every seed photo has a unique slug", () => {
  const slugs = photos.map((photo) => photo.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});
