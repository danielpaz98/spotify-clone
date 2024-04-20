// LAYOUT METADATA
import { metadata as layoutMetadata } from "@/app/layout";
// ACTIONS
import { getSongsByTitle } from "@/actions";
// COMPONENTS
import { SearchBar } from "@/components";
import { SearchContent } from "./components";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Search",
};

interface Props {
  searchParams: {
    title: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const songs = await getSongsByTitle({ title: searchParams.title });
  const title = searchParams.title ? "Top result" : "All songs";

  return (
    <main aria-label={`${layoutMetadata.title.default} - ${metadata.title}`}>
      <PageHeader opacity={1} />

      <section id="searchPage">
        <div className="flex flex-col gap-6 max-width-[var(--content-max-width)] p-6">
          <section aria-label="Top result" className="relative flex flex-col mb-4">
            <SearchBar
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              className="mb-4 max-w-full block xs:hidden"
              maxLength={800}
              placeholder="What do you want to play?"
            />

            <div className="flex justify-between items-center mb-2">
              <h2 className="flex-1 text-white text-2xl tracking-[-0.04em] leading-normal font-bold line-clamp-1">
                {title}
              </h2>
            </div>

            <SearchContent songs={songs} />
          </section>
        </div>
      </section>
    </main>
  );
}
