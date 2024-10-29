import { TrackListItem } from "@/components/TrackListItem";
import { getAllSong } from "@/controllers/database";
import { Song } from "@/utils/database.types";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export const TracksList = ({}) => {
  const [tracks, setTracks] = useState<Song[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  useEffect(() => {
    const fetchSong = async () => {
      const data = await getAllSong();
      setTracks(data || []);
    };
    fetchSong();
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);

  // Hàm để tải và phát nhạc
  const playSound = async (url: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Không thể phát nhạc:", error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <FlatList
      data={tracks}
      className="h-full pb-20"
      renderItem={({ item }) => (
        <TrackListItem
          track={item}
          onPress={() => (isPlaying ? stopSound() : playSound(item.url))}
        />
      )}
      nestedScrollEnabled={true}
    />
  );
};
