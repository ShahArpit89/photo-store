import Image from "next/image";
import Link from "next/link";
import { photos } from "@/lib/photos";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Photo Store
        </h1>
        <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
          Browse the collection below.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.slug}>
              <Link
                href={`/photo/${photo.slug}`}
                className="group block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    width={photo.width}
                    height={photo.height}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-medium text-black dark:text-zinc-50">
                    {photo.title}
                  </h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
