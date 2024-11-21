import { TrackListItem } from "@/components/TrackListItem";
import { Song } from "@/utils/database.types";
import React, { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initQueue, playTrack } from "@/redux/playSlice";
import { RootState } from "@/redux/store";
import { useAudioController } from "@/hooks/useAudioController";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
export type TracksListProps = {
  songs: Song[];
  sroll: boolean;
  nestedScroll: boolean;
};
export const TracksList = React.memo(
  ({ songs, sroll, nestedScroll }: TracksListProps) => {
    const dispatch = useDispatch();
    const { currentTrack, isPlaying } = useSelector(
      (state: RootState) => state.player,
      shallowEqual
    );
    const { loadSound, stopCurrentTrack } = useAudioController();

    const sound = useRef<Audio.Sound | null>(null);
    const router = useRouter();

    useEffect(() => {
      if (songs && songs.length > 0) {
        dispatch(initQueue({ queue: songs, history: [] }));
      }
    }, [songs]);

    useEffect(() => {
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
      const trackIndex = songs.findIndex((item) => item.id === track.id);

      if (trackIndex !== -1) {
        const updatedQueue = songs.slice(trackIndex);
        const history = songs.slice(0, trackIndex);

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
          data={songs}
          renderItem={({ item }) => (
            <TrackListItem
              track={item}
              onPress={() => handleTrackSelect(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
          horizontal={false}
          nestedScrollEnabled={nestedScroll}
          scrollEnabled={sroll}
        />
      </View>
    );
  }
);
