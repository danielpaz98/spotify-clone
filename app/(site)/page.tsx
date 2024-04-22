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

      <div className="absolute z-[-1] h-[332px] -mt-[var(--header-height)*2] w-full bg-fuscous-gray bg-main-noise-gradient transition-[background-color] duration-1s" />

      <section id="homePage">
        <div className="pt-2 flex flex-col bg-transparent">
          <div className="flex flex-col gap-6 max-width-[var(--content-max-width)] px-6">
            <section aria-label="Newest songs" className="relative flex flex-col flex-1 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="flex-1 text-white text-2xl tracking-tighter leading-normal font-bold line-clamp-1">
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
