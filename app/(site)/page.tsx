// LAYOUT METADATA
import { metadata as layoutMetadata } from "@/app/layout";
// ACTIONS
import { getSongs } from "@/actions";
// COMPONENTS
import { PageHeader } from "@/components";
import { PageContent } from "./components";

export const metadata = {
  title: "Web Player: Music for everyone",
};

export const revalidate = 0;

export default async function HomePage() {
  const songs = await getSongs();

  return (
    <main aria-label={`${layoutMetadata.title.default} - ${metadata.title}`}>
      <PageHeader />

      <div className="absolute z-[-1] -mt-[var(--header-height)*2] h-[332px] w-full bg-fuscous-gray bg-main-noise-gradient transition-[background-color] duration-1s" />

      <section id="homePage">
        <div className="flex flex-col bg-transparent pt-2">
          <div className="max-width-[var(--content-max-width)] flex flex-col gap-6 px-6">
            <section aria-label="Newest songs" className="relative mb-4 flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <h2 className="line-clamp-1 flex-1 text-2xl font-bold leading-normal tracking-tighter text-white">
                  Newest songs
                </h2>
              </div>

              <PageContent songs={songs} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
