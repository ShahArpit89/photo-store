import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice, getPhotoBySlug, photos } from "@/lib/photos";

export function generateStaticParams() {
  return photos.map((photo) => ({ slug: photo.slug }));
}

export default async function PhotoPage({
  params,
}: PageProps<"/photo/[slug]">) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="relative aspect-[3/2]">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              {photo.title}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {photo.description}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xl font-semibold text-black dark:text-zinc-50">
                {formatPrice(photo.priceCents)}
              </span>
              <button
                type="button"
                disabled
                title="Checkout isn't available yet"
                className="cursor-not-allowed rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background opacity-50"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
