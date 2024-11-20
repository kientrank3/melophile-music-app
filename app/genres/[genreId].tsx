import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  getAllAlbum,
  getGenreWithId,
  getSongsByGenre,
} from "@/controllers/database";
import { Album, Genre, Song } from "@/utils/database.types";
import { ChevronDown } from "lucide-react-native";
import { TracksList } from "@/components/TrackList";
import { AlbumListItem } from "@/components/AlbumListItem";

const GenreScreen = () => {
  const { genreId } = useLocalSearchParams();
  const router = useRouter();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [tracks, setTrack] = useState<Song[]>([]);
  const [album, setAlbum] = useState<Album[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (genreId) {
      // Cập nhật tiêu đề cho trang
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [genreId, navigation]);
  useEffect(() => {
    const fetchGenre = async () => {
      const id = Array.isArray(genreId) ? genreId[0] : genreId;
      const data = await getGenreWithId(parseInt(id));
      setGenre(data || []);
    };

    fetchGenre();
    console.log(genre);
  }, []);
  useEffect(() => {
    const fetchSong = async () => {
      if (genre) {
        const data = await getSongsByGenre(genre.id);
        setTrack(data || []);
      }
    };
    const fetchAlbum = async () => {
      if (genre) {
        const data = await getAllAlbum();
        setAlbum(data || []);
      }
    };

    fetchAlbum();
    fetchSong();
  }, [genre?.id]);
  return (
    <ScrollView className="mt-8">
      <View className="flex justify-center items-center">
        <TouchableOpacity
          className="w-full px-2 mb-[-12px]"
          onPress={() => {
            router.back();
          }}
        >
          <ChevronDown color={"white"} size={22} />
        </TouchableOpacity>
        <Image
          source={{ uri: genre?.imageUrl }}
          alt="image"
          className="h-40 w-40 items-center"
        />
        <Text className="text-white text-lg w-full py-1.5 px-2">
          {genre?.title}
        </Text>
      </View>
      <View>
        <Text className="text-white text-lg w-full py-1.5 px-2">Albums</Text>
        <FlatList
          data={album}
          renderItem={({ item }) => <AlbumListItem album={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>
      <View className="pb-10">
        <TracksList songs={tracks} sroll={false} nestedScroll={true} />
      </View>
    </ScrollView>
  );
};

export default GenreScreen;
