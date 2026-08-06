export type Photo = {
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    slug: "mountain-sunrise",
    title: "Mountain Sunrise",
    description: "First light breaking over a ridgeline, shot from a high alpine trail.",
    priceCents: 4500,
    imageUrl: "/photos/mountain-sunrise.jpg",
    width: 1600,
    height: 1067,
  },
  {
    slug: "coastal-fog",
    title: "Coastal Fog",
    description: "A quiet shoreline wrapped in morning fog, waves barely visible.",
    priceCents: 4000,
    imageUrl: "/photos/coastal-fog.jpg",
    width: 1600,
    height: 1067,
  },
  {
    slug: "desert-dunes",
    title: "Desert Dunes",
    description: "Wind-carved sand dunes stretching to the horizon at midday.",
    priceCents: 5000,
    imageUrl: "/photos/desert-dunes.jpg",
    width: 1600,
    height: 1067,
  },
  {
    slug: "forest-path",
    title: "Forest Path",
    description: "A narrow trail cutting through dense evergreen forest.",
    priceCents: 3500,
    imageUrl: "/photos/forest-path.jpg",
    width: 1600,
    height: 1067,
  },
  {
    slug: "city-lights",
    title: "City Lights",
    description: "A long-exposure skyline shot after dusk, streets glowing below.",
    priceCents: 5500,
    imageUrl: "/photos/city-lights.jpg",
    width: 1600,
    height: 1067,
  },
];

export function getPhotoBySlug(slug: string): Photo | undefined {
  return photos.find((photo) => photo.slug === slug);
}

export function formatPrice(priceCents: number): string {
  return (priceCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
