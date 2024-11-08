import { TrackListItem } from "@/components/TrackListItem";
import { getAllSong, getSongsWithArtist } from "@/controllers/database";
import { Song } from "@/utils/database.types";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { initQueue, playNextTrack, playTrack } from "@/redux/playSlice";
import { RootState } from "@/redux/store";
import { useAudioController } from "@/hooks/useAudioController";
import { useRouter } from "expo-router";

export const TracksList = () => {
  const [tracks, setTracks] = useState<Song[]>([]);
  const dispatch = useDispatch();
  const { currentTrack } = useSelector((state: RootState) => state.player);
  const { stopCurrentTrack } = useAudioController();
  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongsWithArtist();
      setTracks(data || []);
      if (data && data.length > 0) {
        dispatch(initQueue({ queue: data, history: [] })); // Khởi tạo danh sách vào hàng đợi
      }
    };
    fetchSongs();
  }, []);

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
        nestedScrollEnabled={true}
      />
    </View>
  );
};
