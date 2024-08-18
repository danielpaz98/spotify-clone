// LAYOUT METADATA
import { metadata as layoutMetadata } from "@/app/layout";
// ACTIONS
import { getSongsByTitle } from "@/actions";
// COMPONENTS
import { SearchBar, PageHeader } from "@/components";
import { SearchContent } from "./components";

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
        <div className="max-width-[var(--content-max-width)] flex flex-col gap-6 p-6">
          <section aria-label="Top result" className="relative mb-4 flex flex-col">
            <SearchBar
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              autoCapitalize="off"
              autoCorrect="off"
              className="mb-4 block max-w-full xs:hidden"
              maxLength={800}
              placeholder="What do you want to play?"
            />

            <div className="mb-2 flex items-center justify-between">
              <h2 className="line-clamp-1 flex-1 text-2xl font-bold leading-normal tracking-[-0.04em] text-white">
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
