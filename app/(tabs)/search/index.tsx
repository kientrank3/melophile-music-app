import { TrackListGenre } from "@/components/TrackListGenre";
import { ArrowLeft, Camera, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { Genre, Song } from "@/utils/database.types";
import { fetchRandomSongs, getAllGenre } from "@/controllers/database";
import { TracksList } from "@/components/TrackList";

const SearchScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getAllGenre();
      setGenres(data || []);
    };
    fetchGenre();
  }, []);
  useEffect(() => {
    const fetchSongs = async () => {
      const data = await fetchRandomSongs(10);
      setSongs(data || []);
    };
    fetchSongs();
  }, []);

  return (
    <ScrollView stickyHeaderIndices={[1]} className="">
      <View className="p-2.5 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <TouchableOpacity>
            <Image
              className="w-10 h-10 rounded-full"
              source={{
                uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
              }}
              alt="image"
            />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold pl-4">Tìm kiếm</Text>
        </View>
        <Camera className="w-8 h-8" color={"#fff"} />
      </View>
      <View className="p-2.5 bg-black">
        <View className="pl-2.5 flex-row bg-white h-10 items-center rounded-md">
          <TouchableOpacity
            className="h-full w-full flex-row items-center"
            onPress={toggleModal}
          >
            <Search color={"#000"} />

            <Text
              className="pl-5 color-gray-400 text-base text-bold"
              numberOfLines={1}
            >
              {searchText || "What do you want to play ?"}
            </Text>
          </TouchableOpacity>
          {/* Modal */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <View
              className="h-14 justify-center "
              style={{
                backgroundColor: "#282828",
              }}
            >
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={toggleModal}
                  className="w-16 items-center"
                >
                  <ArrowLeft size={30} color={"#fff"} />
                </TouchableOpacity>
                <TextInput
                  selectionColor={"#1DB954"}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                  placeholder="What do you want to play ?"
                  placeholderTextColor={"#c4c4c4"}
                  className="text-base font-medium color-white w-10/12 h-full"
                />
              </View>
            </View>
            <View className="h-full bg-black">
              <View>
                <Text className="color-white text-xl font-semibold p-5">
                  Các tìm kiếm gần đây
                </Text>
                <View className="h-1/2">
                  <TracksList songs={songs} sroll={true} nestedScroll={true} />
                </View>

                <View className="w-full justify-center items-center py-5">
                  <TouchableOpacity className="border border-white h-10 rounded-full w-80 justify-center items-center">
                    <Text className="color-white text-md font-semibold">
                      Xoá nội dung tìm kiếm gần đây
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View>
        <Text className="px-2 py-1 text-[18px] font-semibold text-white">
          Duyệt tìm tất cả
        </Text>
        <View className="flex-row flex-wrap">
          {genres.map((item) => (
            <View key={item.id} className="w-1/2">
              <TrackListGenre
                title={item.title}
                imageUrl={item.imageUrl}
                bgColor={item.color}
              />
            </View>
          ))}
          <View className="pb-80" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
