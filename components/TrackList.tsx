import { TrackListItem } from "@/components/TrackListItem";
import FloatingPlayer from "@/components/FloatingPlayer";
import { getAllSong } from "@/controllers/database";
import { Song } from "@/utils/database.types";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { playTrack } from "@/redux/playSlice";

export const TracksList = () => {
  const [tracks, setTracks] = useState<Song[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getAllSong();
      setTracks(data || []);
    };
    fetchSongs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        horizontal={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};
