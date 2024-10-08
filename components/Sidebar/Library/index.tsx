import { useCallback, useContext, useRef, useState } from "react";
// PLUGINS
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
// UTILS
import { cn } from "@/utils";
// CONTEXTS
import { SidebarContext } from "../index";
// COMPONENTS
import { OverlayScrollbars, MediaItem, Link } from "@/components";
import { Card, Button, Tooltip, Popover } from "@/components/ui";
import { MediaItemSkeleton } from "@/components/Skeletons";
// IMAGES
import LikedSongsImage from "@/images/liked-songs.png";
// ICONS
import LibraryIcon1 from "@/icons/library.svg";
import LibraryIcon2 from "@/icons/library-2.svg";
import PlusIcon from "@/icons/plus.svg";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import ArrowLeftIcon from "@/icons/arrow-left.svg";
import ThumbTackIcon from "@/icons/thumbtack.svg";
// import MusicPlus from "@/icons/music-plus.svg";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";
import { useOnPlay } from "@/hooks";
// STORES
import { useLastLikedSong, useAuthModal, useSubscribeModal, useUploadModal } from "@/store";
// MODELS
import type { LibraryData } from "@/models";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  libraryData: LibraryData | null;
}

export default function Library({ className, libraryData, ...restProps }: Props) {
  const { session } = useAuth();
  const { lastLikedSong } = useLastLikedSong();
  const { expanded, setExpaded } = useContext(SidebarContext);

  const classNames = cn("flex flex-col flex-1 min-h-0 overflow-hidden", className);
  const createPlaylist = useRef<HTMLDivElement>(null);

  const [loginPopoverOpen, setLoginPopoverOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();
  const pathname = usePathname();
  const onPlay = useOnPlay({ songs: libraryData?.songs ?? null });
  const mdBreakpoint = useMediaQuery({ query: "(min-width: 800px)" });

  const LibraryIcon = expanded ? LibraryIcon1 : LibraryIcon2;
  const subscription = session?.user?.subscription;
  const showMore = false;

  const handleAddNewSong = useCallback(() => {
    if (!session) return setLoginPopoverOpen(true);

    if (!subscription) return subscribeModal.onOpen();

    return uploadModal.onOpen();
  }, [session, subscription, subscribeModal, uploadModal]);

  return (
    <div className={classNames} {...restProps}>
      <header className={cn("px-4 py-2 font-bold", { "shadow-[0_6px_10px_rgb(0,0,0,0.6)]": scrollY > 0 })}>
        <div className="flex items-center gap-2">
          <div className="mr-auto flex gap-1">
            <button
              aria-label="Collapse Your Library"
              className="flex h-10 flex-shrink-0 items-center gap-3 px-2 py-1 text-neutral-400 transition-[color] duration-2s ease-linear hover:text-white"
              data-tooltip-id="library-tooltip"
              onClick={() => session && setExpaded(!expanded)}
            >
              <LibraryIcon className="h-6 w-6" fill="currentColor" />
              {expanded && <span>Your Library</span>}
            </button>

            <Tooltip noArrow delayHide={0} id="library-tooltip" offset={6} place="top">
              <span role="tooltip">{expanded ? "Collapse Your Library" : "Expand Your Library"}</span>
            </Tooltip>
          </div>

          {expanded && (
            <>
              <div>
                <Button
                  rounded
                  aria-label="Add new song"
                  className="p-2 duration-2s hover:bg-wood-smoke active:bg-black enabled:hover:transform-none"
                  data-tooltip-id="create-playlist-tooltip"
                  id="info-tooltip"
                  size="sm"
                  onClick={handleAddNewSong}
                >
                  <PlusIcon className="h-4 w-4" fill="currentColor" />
                </Button>

                <Tooltip
                  noArrow
                  anchorSelect="#info-tooltip"
                  closeEvents={{ click: true, mouseleave: true }}
                  id="info-tooltip"
                  place="top"
                >
                  <span role="tooltip">Add a new song</span>
                </Tooltip>

                {/* <Tooltip
                  clickable
                  noArrow
                  openOnClick
                  className="!p-1 !transition-none"
                  closeEvents={{ click: true, blur: true }}
                  delayHide={0}
                  delayShow={0}
                  id="create-playlist-tooltip"
                  opacity={1}
                  place="bottom-start"
                >
                  <ul role="menu" tabIndex={0}>
                    <li role="presentation">
                      <button
                        className="flex items-center cursor-default text-white/90 hover:bg-white/10 rounded-sm gap-3 h-10 w-full p-3 pr-2"
                        role="menuitem"
                        tabIndex={-1}
                        type="button"
                        onClick={handleAddNewSong}
                      >
                        <MusicPlus className="w-4 h-4" fill="currentColor" />
                        <span>Create a new playlist</span>
                      </button>
                    </li>
                  </ul>
                </Tooltip> */}
              </div>

              {session && (
                <Button
                  rounded
                  aria-label={showMore ? "Enlarge Your Library" : "Reduce Your Library"}
                  className="hidden p-2 duration-2s hover:bg-wood-smoke active:bg-black enabled:hover:transform-none lg:block"
                  data-tooltip-id="show-more-tooltip"
                  size="sm"
                >
                  {!showMore ? (
                    <ArrowRightIcon className="h-4 w-4" fill="currentColor" />
                  ) : (
                    <ArrowLeftIcon className="h-4 w-4" fill="currentColor" />
                  )}

                  <Tooltip noArrow id="show-more-tooltip" place="top">
                    <span role="tooltip">{!showMore ? "Show more" : "Show less"}</span>
                  </Tooltip>
                </Button>
              )}
            </>
          )}
        </div>
      </header>

      <OverlayScrollbars
        defer
        options={{ scrollbars: { autoHide: "leave", autoHideDelay: 1000 } }}
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        <section className={cn("flex flex-col gap-2", expanded ? "p-2" : "p-1")}>
          {session ? (
            <ul aria-label="Your Library">
              {!libraryData ? (
                Array.from({ length: 8 }, (_, i) => (
                  <li key={i}>
                    <MediaItemSkeleton />
                  </li>
                ))
              ) : (
                <>
                  {libraryData.liked_songs > 0 && (
                    <li>
                      <Link href="/liked">
                        <MediaItem active={pathname === "/liked"}>
                          <MediaItem.Image
                            key={lastLikedSong?.id}
                            alt="Liked Songs"
                            className={cn({ "animate-heart-beat": lastLikedSong?.id })}
                            image={LikedSongsImage}
                          />

                          {expanded && (
                            <div className="flex flex-1 flex-col gap-y-1 overflow-hidden">
                              <MediaItem.Title>Liked Songs</MediaItem.Title>
                              <MediaItem.Author>
                                <ThumbTackIcon className="mr-2 inline-block h-3 w-3 fill-brand align-text-top" />
                                <span>
                                  Playlist{" • "}
                                  {`${libraryData.liked_songs} ${
                                    libraryData.liked_songs > 1 ? "songs" : "song"
                                  }`}
                                </span>
                              </MediaItem.Author>
                            </div>
                          )}
                        </MediaItem>
                      </Link>
                    </li>
                  )}

                  {libraryData?.songs?.map((song) => (
                    <li key={song.id}>
                      <MediaItem onClick={() => onPlay({ song })}>
                        <MediaItem.Image alt={song.title} imagePath={song.image_path} />

                        {expanded && (
                          <div className="flex flex-1 flex-col gap-y-1 overflow-hidden">
                            <MediaItem.Title>{song.title}</MediaItem.Title>
                            <MediaItem.Author>{song.author}</MediaItem.Author>
                          </div>
                        )}
                      </MediaItem>
                    </li>
                  ))}
                </>
              )}
            </ul>
          ) : (
            <>
              <Popover open={loginPopoverOpen}>
                <Popover.Anchor asChild>
                  <Card ref={createPlaylist} className="m-2">
                    <Card.Title className="mb-2">Add your first song</Card.Title>
                    <Card.Description>It&#39;s easy, we&#39;ll help you</Card.Description>
                    <Card.Content className="mt-5">
                      <Button rounded size="sm" type="button" variant="primary" onClick={handleAddNewSong}>
                        Add song
                      </Button>
                    </Card.Content>
                  </Card>
                </Popover.Anchor>

                <Popover.Content
                  className="min-w-[332px] rounded-lg bg-transparent p-0"
                  data-side="bottom"
                  side={mdBreakpoint ? "right" : "bottom"}
                  sticky="always"
                  onPointerDownOutside={(e) => {
                    if (!createPlaylist?.current?.contains(e?.target as Node)) setLoginPopoverOpen(false);
                  }}
                >
                  <Card className="w-full max-w-[336px] bg-info p-4">
                    <Card.Title className="mb-2">Add a song</Card.Title>
                    <Card.Description>Log in to add your songs.</Card.Description>
                    <Card.Content className="mt-6 flex justify-end">
                      <Button rounded size="sm" type="button" onClick={() => setLoginPopoverOpen(false)}>
                        Not now
                      </Button>

                      <Button
                        rounded
                        size="sm"
                        type="button"
                        variant="primary"
                        onClick={() => {
                          authModal.onOpen({ view: "sign_in" });
                          setLoginPopoverOpen(false);
                        }}
                      >
                        Log in
                      </Button>
                    </Card.Content>
                  </Card>

                  <Popover.Arrow className="h-[6px] w-[14px] fill-info" />
                </Popover.Content>
              </Popover>

              <Card className="m-2">
                <Card.Title className="mb-2">Let&#39;s find some podcasts to follow</Card.Title>
                <Card.Description>We&#39;ll keep you updated on new episodes</Card.Description>
                <Card.Content className="mt-5">
                  <Button rounded size="sm" type="button" variant="primary">
                    Browse podcasts
                  </Button>
                </Card.Content>
              </Card>
            </>
          )}
        </section>
      </OverlayScrollbars>
    </div>
  );
}
