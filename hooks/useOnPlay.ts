// MODELS
import type { Song } from "@/models";
// HOOKS
import { useAuth } from "@/contexts/AuthContext/hooks";
import { usePlayer } from "@/hooks";
// STORES
import { useSubscribeModal, useAuthModal } from "@/store";

interface HookParams {
  songs: Song[] | null;
}

export default function useOnPlay({ songs }: HookParams) {
  const player = usePlayer();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();

  const { session } = useAuth();
  const subscription = session?.user?.subscription;

  const onPlay = ({ song }: { song: Song }) => {
    if (!session) return authModal.onOpen({ view: "sign_in" });

    if (!subscription) return subscribeModal.onOpen();

    player.setCurrentMusic({ song, songs });
  };

  return onPlay;
}
