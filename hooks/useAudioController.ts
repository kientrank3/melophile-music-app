import { useRef } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  playTrack,
  pauseTrack,
  playNextTrack,
  playPreviousTrack,
  setPosition,
  setDuration,
  killTrack,
} from "@/redux/playSlice";

export const useAudioController = () => {
  const { currentTrack, isPlaying, position, duration } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();
  const sound = useRef<Audio.Sound | null>(null);
  const isSoundLoaded = useRef(false);

  // Hàm chuyển đổi giữa phát và tạm dừng
  const togglePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack(currentTrack!));
    }
  };

  // Dừng và giải phóng hoàn toàn bài hát hiện tại
  const stopCurrentTrack = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
      sound.current = null;
      isSoundLoaded.current = false;
    }
    // Đặt lại `position` và `duration` khi dừng bài hát
    dispatch(setPosition(0));
    dispatch(setDuration(0));
  };

  // Phát bài tiếp theo
  const handlePlayNext = async () => {
    await stopCurrentTrack(); // Dừng và giải phóng bài hiện tại
    dispatch(playNextTrack()); // Dispatch để phát bài tiếp theo
  };

  // Phát bài trước đó
  const handlePlayPrevious = async () => {
    await stopCurrentTrack(); // Dừng và giải phóng bài hiện tại
    dispatch(playPreviousTrack()); // Dispatch để phát bài trước đó
  };

  // Tua đến một vị trí trong bài hát
  const handleSeek = async (value: number) => {
    if (sound.current) {
      await sound.current.setPositionAsync(value);
      dispatch(setPosition(value));
    }
  };
  const handleKillTrack = async () => {
    await stopCurrentTrack();
    dispatch(killTrack());
  };

  return {
    togglePlayPause,
    handlePlayNext,
    handlePlayPrevious,
    handleSeek,
    stopCurrentTrack,
    handleKillTrack,
  };
};
