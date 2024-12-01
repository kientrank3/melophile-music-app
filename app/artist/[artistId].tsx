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
  fetchRandomArtists,
  fetchSongsByAlbum,
  getAlbumsByArtist,
  getAlbumWithId,
  getArtistWithId,
  getSongsByArtist,
} from "@/controllers/database";
import { Album, Artist, Song } from "@/utils/database.types";
import {
  ArrowLeft,
  ChevronDown,
  CirclePause,
  CirclePlay,
  EllipsisVertical,
  Shuffle,
} from "lucide-react-native";
import { RootState } from "@/redux/store";
import { shallowEqual, useSelector } from "react-redux";
import { colors } from "@/constants/Tokens";
import { TracksList } from "@/components/TrackList";
import { AlbumListItem } from "@/components/AlbumListItem";
import { ArtistItem } from "@/components/ArtistItem";

const ArtistScreen = () => {
  const { artistId } = useLocalSearchParams();
  const router = useRouter();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [randomArtist, setRandomArtist] = useState<Artist[]>([]);
  const [album, setAlbum] = useState<Album[]>([]);
  const [tracks, setTrack] = useState<Song[]>([]);
  const { isPlaying } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (artistId) {
      // Cập nhật tiêu đề cho trang
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [artistId, navigation]);
  useEffect(() => {
    const fetchArtist = async () => {
      const id = Array.isArray(artistId) ? artistId[0] : artistId;
      const data = await getArtistWithId(parseInt(id));
      setArtist(data || []);
    };
    fetchArtist();
  }, []);
  useEffect(() => {
    const fetchArtistRandom = async () => {
      const data = await fetchRandomArtists(5);
      setRandomArtist(data || []);
    };
    fetchArtistRandom();
  }, []);
  useEffect(() => {
    const fetchSong = async () => {
      if (artist) {
        const data = await getSongsByArtist(artist.id);
        setTrack(data || []);
      }
    };
    fetchSong();
  }, [artist?.id]);
  useEffect(() => {
    const fetchAlbum = async () => {
      if (artist) {
        const data = await getAlbumsByArtist(artist.id);
        setAlbum(data || []);
      }
    };
    fetchAlbum();
  }, [artist?.id]);
  return (
    <ScrollView className="mt-8">
      <View className="flex justify-center items-center">
        <Image
          source={{ uri: artist?.imageUrl }}
          alt="image"
          className="items-center h-56 w-full"
        />
        <TouchableOpacity
          className="w-full px-2 mb-[-12px] absolute top-4 left-2"
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeft color={"white"} size={30} />
        </TouchableOpacity>
        <Text className="text-gray-100 text-4xl font-semibold absolute bottom-0 left-2">
          {artist?.name}
        </Text>
      </View>
      <View className="px-2">
        <View>
          <Text className="text-white text-xs py-1 pt-2.5">
            130.3 N người nghe hàng tháng
          </Text>
        </View>
        <View className="flex-row items-center justify-between py-1">
          <View className="flex-row items-center">
            <TouchableOpacity className="border-[1px] border-white rounded-md p-1.5">
              <Text className="text-white text-xs">Đang theo dõi</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center px-8">
              <EllipsisVertical color={"white"} size={18} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between w-[30%] px-2">
            <TouchableOpacity className="px-2">
              <Shuffle color={colors.primary} size={28} />
            </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity>
                <CirclePlay color={colors.primary} size={40} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <CirclePause color={colors.primary} size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View className="px-2">
        <Text className="text-white text-lg font-semibold py-2">Phổ biến</Text>
        <TracksList
          songs={tracks}
          sroll={false}
          nestedScroll={true}
          id={"artistList" + artistId}
          onSelectSong={() => {}}
        />
      </View>
      <View className="px-2">
        <Text className="text-white text-lg font-semibold py-2">
          Play list dựa trên nghệ sĩ
        </Text>
        <FlatList
          data={album}
          renderItem={({ item }) => <AlbumListItem album={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>
      <View className="px-2">
        <Text className="text-white text-lg font-semibold py-2">
          Fan cũng thích
        </Text>
        <FlatList
          data={randomArtist}
          renderItem={({ item }) => <ArtistItem artist={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>
    </ScrollView>
  );
};

export default ArtistScreen;
