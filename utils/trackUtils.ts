// utils/trackUtils.ts
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initQueue, playTrack } from "@/redux/playSlice";
import { Song } from "@/utils/database.types";
import { useRouter } from "expo-router";
import { RootState } from "@/redux/store";

/**
 * Handles the selection of a track.
 * @param track - The track that was selected.
 * @param songs - The list of songs.
 * @param id - The ID of the track list.
 * @param onSelectSong - Callback function when a song is selected.
 */
export const handleTrackSelect = async (
  track: Song,
  songs: Song[],
  id: string,
  onSelectSong: () => void
) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentTrack } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );

  // If track is already the current track, skip
  if (currentTrack && currentTrack.id === track.id) return;

  // Find the track index in the list
  const trackIndex = songs.findIndex((item) => item.id === track.id);

  if (trackIndex === -1) {
    console.error("Track not found in the song list.");
    return;
  }

  const updatedQueue = songs.slice(trackIndex);
  const updateHistory = songs.slice(0, trackIndex);
  dispatch(
    initQueue({
      queue: updatedQueue,
      history: updateHistory,
      trackListId: id,
    })
  );

  // Play the selected track
  dispatch(playTrack(track));
  if (onSelectSong) onSelectSong();
  router.push("/player");
};
