// LAYOUT METADATA
import { metadata as layoutMetadata } from "@/app/layout";
// PLUGINS
import Image from "next/image";
// ACTIONS
import { getUserSession, getLikedSongs } from "@/actions";
// COMPONENTS
import { LikedContent } from "./components";
import { ProfilePicture, PageBanner } from "@/components";
// IMAGES
import LikedSongsImage from "@/images/liked-songs.png";

export const metadata = {
  title: "Liked Songs",
};

export const revalidate = 0;

export default async function LikedSongsPage() {
  const session = await getUserSession();
  const songs = await getLikedSongs();

  return (
    <main aria-label={`${layoutMetadata.title.default} - ${metadata.title}`}>
      <section className="-mt-[var(--header-height)]" id="likedSongsPage" role="presentation">
        <div className="content-spacing relative !pb-[var(--content-spacing)] flex max-h-[400px] min-h-[340px] text-white overflow-hidden">
          <PageBanner className="bg-blue-gem">
            <div className="bg-transparent-noise-gradient absolute w-full h-full top-0 left-0" />

            <PageBanner.Header className="bg-blue-gem">
              <div className="bg-black/60 h-full" />
            </PageBanner.Header>
          </PageBanner>

          <div className="flex-1 flex items-end">
            <picture className="relative flex-shrink-0 z-0 mr-[var(--content-spacing)] h-[clamp(128px,128px_+_(100vw_-_var(--left-sidebar-width,0px)_-_var(--panel-width,0px)_-_600px)/424*104,232px)] w-[clamp(128px,128px+(100vw-var(--left-sidebar-width,0px)-var(--panel-width,0px)-600px)/424*104,232px)]">
              <Image
                fill
                priority
                alt="Playlist"
                className="object-cover rounded shadow-[0_4px_60px_rgba(0,0,0,.5)]"
                sizes="(min-width: 1280px) 232px, 192px"
                src={LikedSongsImage}
              />
            </picture>

            <div className="flex-1 flex flex-col z-0">
              <span className="text-sm">Playlist</span>

              <h1 className="mt-1 font-black text-white [font-size:_clamp(2rem,7.4vw,6rem)] tracking-tighter">
                Liked Songs
              </h1>

              <div className="mt-2 flex items-center flex-wrap">
                <div className="flex items-center gap-1">
                  <ProfilePicture user={session?.user ?? null} />
                  <span className="text-sm font-medium">{session?.user?.full_name}</span>
                </div>

                {songs?.length && songs.length > 0 && (
                  <span className="before:content-['•'] before:mx-1 font-light text-sm">
                    {`${songs.length} ${songs.length > 1 ? "songs" : "song"}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-gem bg-main-noise-gradient absolute w-full h-[232px] z-[-1]" />

        <div className="content-spacing !pt-8">
          <section aria-label="Liked songs">
            <LikedContent songs={songs} />
          </section>
        </div>
      </section>
    </main>
  );
}
