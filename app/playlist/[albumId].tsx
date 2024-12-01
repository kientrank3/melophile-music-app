import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchSongsByAlbum, getAlbumWithId } from "@/controllers/database";
import { Album, Song } from "@/utils/database.types";
import {
  ChevronDown,
  CirclePause,
  CirclePlay,
  CirclePlus,
  Download,
  EllipsisVertical,
  Shuffle,
} from "lucide-react-native";
import { RootState } from "@/redux/store";
import { shallowEqual, useSelector } from "react-redux";
import { colors } from "@/constants/Tokens";
import { TracksList } from "@/components/TrackList";

const PlaylistScreen = () => {
  const { albumId } = useLocalSearchParams();
  const router = useRouter();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTrack] = useState<Song[]>([]);
  const { isPlaying } = useSelector(
    (state: RootState) => state.player,
    shallowEqual
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (albumId) {
      // Cập nhật tiêu đề cho trang
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [albumId, navigation]);
  useEffect(() => {
    const fetchAlbum = async () => {
      const id = Array.isArray(albumId) ? albumId[0] : albumId;
      const data = await getAlbumWithId(parseInt(id));
      setAlbum(data || []);
    };
    fetchAlbum();
  }, []);
  useEffect(() => {
    const fetchSong = async () => {
      if (album) {
        const data = await fetchSongsByAlbum(album.id);
        setTrack(data || []);
      }
    };
    fetchSong();
  }, [album?.id]);
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
          source={{ uri: album?.imageUrl }}
          alt="image"
          className="h-40 w-40 items-center"
        />
        <Text className="text-white text-lg w-full py-1.5 px-2">
          {album?.title}
        </Text>
        <Text className="text-white text-sm w-full py-1 px-2">
          {album?.create_date}
        </Text>
        <Text className="text-gray-400 text-xs w-full py-1 px-2">
          Press play, press start.
        </Text>
        <View className="items-center flex-row w-full py-1 px-2">
          <Image
            style={{ width: 20, height: 20 }}
            source={require("../../assets/images/logoIcon.png")}
            alt="image"
          />
          <Text className="text-gray-400 text-xs w-full pl-1.5">
            •6,798,494 saves•100 songs,about 5 hr
          </Text>
        </View>

        <View className="flex-row justify-between items-center w-full py-2">
          <View className="flex-row items-center w-[75%] px-2">
            <TouchableOpacity className="pr-1.5">
              <CirclePlus color={"white"} size={22} />
            </TouchableOpacity>
            <TouchableOpacity className="px-1.5">
              <Download color={"white"} size={22} />
            </TouchableOpacity>
            <TouchableOpacity className="px-1.5">
              <EllipsisVertical color={"white"} size={22} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-between w-[25%] px-2">
            <TouchableOpacity className="px-2.5">
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
      <View className="pb-10">
        <TracksList
          songs={tracks}
          sroll={false}
          nestedScroll={true}
          id={"albumList" + albumId}
          onSelectSong={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default PlaylistScreen;
