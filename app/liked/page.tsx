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
        <div className="content-spacing relative flex max-h-[400px] min-h-[340px] overflow-hidden !pb-[var(--content-spacing)] text-white">
          <PageBanner className="bg-blue-gem">
            <div className="absolute left-0 top-0 h-full w-full bg-transparent-noise-gradient" />

            <PageBanner.Header className="bg-blue-gem">
              <div className="h-full bg-black/60" />
            </PageBanner.Header>
          </PageBanner>

          <div className="flex flex-1 items-end">
            <picture className="relative z-0 mr-[var(--content-spacing)] h-[clamp(128px,128px_+_(100vw_-_var(--left-sidebar-width,0px)_-_var(--panel-width,0px)_-_600px)/424*104,232px)] w-[clamp(128px,128px+(100vw-var(--left-sidebar-width,0px)-var(--panel-width,0px)-600px)/424*104,232px)] flex-shrink-0">
              <Image
                fill
                priority
                alt="Playlist"
                className="rounded object-cover shadow-[0_4px_60px_rgba(0,0,0,.5)]"
                sizes="(min-width: 1280px) 232px, 192px"
                src={LikedSongsImage}
              />
            </picture>

            <div className="z-0 flex flex-1 flex-col">
              <span className="text-sm">Playlist</span>

              <h1 className="mt-1 font-black tracking-tighter text-white [font-size:_clamp(2rem,7.4vw,6rem)]">
                Liked Songs
              </h1>

              <div className="mt-2 flex flex-wrap items-center">
                <div className="flex items-center gap-1">
                  <ProfilePicture user={session?.user ?? null} />
                  <span className="text-sm font-medium">{session?.user?.full_name}</span>
                </div>

                {songs?.length && songs.length > 0 && (
                  <span className="text-sm font-light before:mx-1 before:content-['•']">
                    {`${songs.length} ${songs.length > 1 ? "songs" : "song"}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute z-[-1] h-[232px] w-full bg-blue-gem bg-main-noise-gradient" />

        <div className="content-spacing !pt-8">
          <section aria-label="Liked songs">
            <LikedContent songs={songs} />
          </section>
        </div>
      </section>
    </main>
  );
}
