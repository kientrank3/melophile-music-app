import { TrackListItem } from "@/components/TrackListItem";
import { Song } from "@/utils/database.types";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { initQueue, playTrack } from "@/redux/playSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
export type TracksListProps = {
  songs: Song[];
  sroll: boolean;
  nestedScroll: boolean;
  id: string;
  onSelectSong: () => void;
};
export const TracksList = React.memo(
  ({ songs, sroll, nestedScroll, id, onSelectSong }: TracksListProps) => {
    const dispatch = useDispatch();
    const { currentTrack } = useSelector(
      (state: RootState) => state.player,
      shallowEqual
    );

    const router = useRouter();

    const handleTrackSelect = async (track: Song) => {
      // Nếu track đã là currentTrack, bỏ qua
      if (currentTrack && currentTrack.id === track.id) return;

      // Xác định vị trí của track trong danh sách
      const trackIndex = songs.findIndex((item) => item.id === track.id);

      if (trackIndex === -1) {
        console.error("Track không nằm trong danh sách bài hát.");
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

      // Phát bài hát được chọn
      dispatch(playTrack(track));
      if (onSelectSong) onSelectSong();
      router.push("/player");
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
