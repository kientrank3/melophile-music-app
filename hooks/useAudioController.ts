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
  const { currentTrack, isPlaying, position, trackListId } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();
  const isSoundLoaded = useRef(false);
  const sound = useRef<Audio.Sound | null>(null);

  const loadSound = async (currentTrackList: string) => {
    if (!currentTrack || trackListId !== currentTrackList) return;
    if (sound.current) {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
      sound.current = null;
    }

    dispatch(setPosition(0));
    dispatch(setDuration(0));
    // Nếu đã có âm thanh, dừng và giải phóng
    // Tạo âm thanh mới từ track hiện tại
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: currentTrack.url },
      {
        shouldPlay: isPlaying,
        positionMillis: position,
        isLooping: false,
        shouldCorrectPitch: true,
      }
    );

    sound.current = newSound;

    // Cập nhật `duration` vào Redux
    if (status.isLoaded) {
      dispatch(setDuration(status.durationMillis || 0));
      dispatch(setPosition(status.positionMillis || 0));
    }
    // Thiết lập cập nhật trạng thái phát nhạc
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        dispatch(setPosition(status.positionMillis || 0));
        dispatch(setDuration(status.durationMillis || 0));
        if (status.didJustFinish) {
          handlePlayNext(); // Chuyển bài khi kết thúc
        }
      }
    });
  };
  const stopIfTrackListChanged = async (
    newTrackListId: string,
    currentTrackList: string
  ) => {
    if (newTrackListId !== currentTrackList && sound.current) {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
      sound.current = null;
    }
  };
  // Hàm chuyển đổi giữa phát và tạm dừng
  const togglePlayPause = async () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack(currentTrack!));
    }
  };

  // Dừng và giải phóng hoàn toàn bài hát hiện tại
  const stopCurrentTrack = async () => {
    if (currentTrack) {
      if (sound.current) {
        await sound.current.stopAsync();
        await sound.current.unloadAsync();

        sound.current = null;
      }
      dispatch(pauseTrack());
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
    loadSound,
    togglePlayPause,
    handlePlayNext,
    handlePlayPrevious,
    handleSeek,
    stopCurrentTrack,
    handleKillTrack,
    stopIfTrackListChanged,
  };
};
