import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Photo Store",
  description: "Learn who's behind Photo Store.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          About Us
        </h1>

        <section className="mt-10">
          <h2 className="text-lg font-medium text-black dark:text-zinc-50">
            Bio
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder bio copy. This is where the photographer or store
            owner&apos;s background and story will go.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium text-black dark:text-zinc-50">
            Mission Statement
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder mission statement. This is where the store&apos;s
            purpose and values will go.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium text-black dark:text-zinc-50">
            Contact &amp; Social
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder contact info. This is where email, social links, and
            other ways to reach the store will go.
          </p>
        </section>
      </main>
    </div>
  );
}
