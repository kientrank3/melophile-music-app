import { TrackListItem } from "@/components/TrackListItem";
import { getSongsWithArtist } from "@/controllers/database";
import { Song } from "@/utils/database.types";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  initQueue,
  playTrack,
  setDuration,
  setPosition,
} from "@/redux/playSlice";
import { RootState } from "@/redux/store";
import { useAudioController } from "@/hooks/useAudioController";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
export type TracksListProps = {
  songs: Song[];
  sroll: boolean;
  nestedScroll: boolean;
};
export const TracksList = ({ songs, sroll, nestedScroll }: TracksListProps) => {
  const [tracks, setTracks] = useState<Song[]>([]);
  const dispatch = useDispatch();
  const { currentTrack, position, isPlaying } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  const { stopCurrentTrack, handlePlayNext } = useAudioController();

  const sound = useRef<Audio.Sound | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (songs && songs.length > 0) {
      setTracks(songs);
      dispatch(initQueue({ queue: songs, history: [] }));
    }
  }, [songs, dispatch]);

  useEffect(() => {
    const loadSound = async () => {
      if (!currentTrack) return;

      // Nếu đã có âm thanh, dừng và giải phóng
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current = null;
      }
      dispatch(setPosition(0));
      dispatch(setDuration(0));

      // Tạo âm thanh mới từ track hiện tại
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: currentTrack.url },
        { shouldPlay: isPlaying, positionMillis: position }
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

    loadSound();
    return () => {
      // Chỉ giải phóng âm thanh nếu không phát
      if (sound.current && !isPlaying) {
        sound.current.unloadAsync();
        sound.current = null;
      }
    };
  }, [currentTrack, isPlaying]);
  const handleTrackSelect = async (track: Song) => {
    // Kiểm tra nếu bài hát đã là currentTrack thì không thực hiện lại
    if (currentTrack && currentTrack.id === track.id) return;

    // Nếu có bài nhạc đang phát, dừng lại trước khi phát bài mới
    if (currentTrack) {
      await stopCurrentTrack();
    }

    // Xác định vị trí của track trong danh sách
    const trackIndex = tracks.findIndex((item) => item.id === track.id);

    if (trackIndex !== -1) {
      const updatedQueue = tracks.slice(trackIndex);
      const history = tracks.slice(0, trackIndex);

      // Cập nhật lại hàng đợi trong Redux
      dispatch(initQueue({ queue: updatedQueue, history: history }));
      // Cập nhật currentTrack và phát bài đã chọn
      dispatch(playTrack(track));
      router.push("/player");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <TrackListItem track={item} onPress={() => handleTrackSelect(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        horizontal={false}
        nestedScrollEnabled={nestedScroll}
        scrollEnabled={sroll}
      />
    </View>
  );
};
