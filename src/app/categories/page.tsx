import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories · Photo Store",
  description: "Browse photos by category.",
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Categories
        </h1>
        <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">
          Coming soon. We&apos;re working on a way to browse photos by category
          — check back soon.
        </p>
      </main>
    </div>
  );
}
