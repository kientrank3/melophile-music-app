import { TrackListItem } from "@/components/TrackListItem";
import { getAllSong, getSongsWithArtist } from "@/controllers/database";
import { Song } from "@/utils/database.types";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToQueue, initQueue, playNextTrack } from "@/redux/playSlice";
import { RootState } from "@/redux/store";

export const TracksList = () => {
  const [tracks, setTracks] = useState<Song[]>([]);
  const dispatch = useDispatch();
  const { queue } = useSelector((state: RootState) => state.player);
  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongsWithArtist();
      setTracks(data || []);
    };
    fetchSongs();
  }, []);
  const handleTrackSelect = (track: Song) => {
    if (queue.length === 0) {
      dispatch(initQueue([track]));
    } else {
      dispatch(addToQueue(track));
      dispatch(playNextTrack());
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
