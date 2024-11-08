import { useEffect, useRef } from "react";
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
} from "@/redux/playSlice";

export const useAudioController = () => {
  const { currentTrack, isPlaying, position, duration } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();
  const sound = useRef<Audio.Sound | null>(null);
  const isSoundLoaded = useRef(false); // Kiểm tra trạng thái âm thanh đã tải

  // Load và phát âm thanh khi `currentTrack` thay đổi
  useEffect(() => {
    const loadSound = async () => {
      // Kiểm tra nếu không có track hoặc âm thanh đã được tải
      if (!currentTrack) return;

      // Nếu đã có âm thanh, dừng và giải phóng
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current = null;
        isSoundLoaded.current = false;
      }
      // dispatch(setPosition(0));
      // dispatch(setDuration(0));

      // Tạo âm thanh mới từ track hiện tại
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: currentTrack.url },
        { shouldPlay: isPlaying, positionMillis: position }
      );

      sound.current = newSound;
      isSoundLoaded.current = true;

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

    loadSound();

    return () => {
      // Chỉ giải phóng âm thanh nếu không phát
      if (sound.current && !isPlaying) {
        sound.current.unloadAsync();
        sound.current = null;
        isSoundLoaded.current = false;
      }
    };
  }, [currentTrack]);

  // Điều khiển phát hoặc tạm dừng âm thanh khi `isPlaying` thay đổi
  useEffect(() => {
    const controlPlayback = async () => {
      if (sound.current) {
        if (isPlaying) {
          await sound.current.playAsync();
        } else {
          await sound.current.pauseAsync();
        }
      }
    };
    controlPlayback();
  }, [isPlaying]);

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

  return {
    togglePlayPause,
    handlePlayNext,
    handlePlayPrevious,
    handleSeek,
    stopCurrentTrack,
  };
};
