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
import {
  fetchRandomSongs,
  getAllGenre,
  searchSongsByName,
} from "@/controllers/database";
import { TracksList } from "@/components/TrackList";

const SearchScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [genres, setGenres] = useState<Genre[]>([]);
  const closeModal = () => {
    setModalVisible(false);
    setSearchText(""); // Reset nội dung tìm kiếm khi đóng modal
    setSongs([]); // Xóa danh sách bài hát tìm kiếm
  };

  // Mở modal
  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getAllGenre();
      setGenres(data || []);
    };
    fetchGenre();
  }, []);
  const handleSearch = async () => {
    if (searchText.trim() === "") {
      setSongs([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchSongsByName(searchText);
      setSongs(results);
    } catch (error) {
      console.error("Error searching songs:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 500); // Thêm debounce để giảm số lần gọi API

    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <ScrollView stickyHeaderIndices={[1]} className="mt-8">
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
        <View className="pl-2.5 h-12 flex-row bg-white  items-center rounded-md">
          <TouchableOpacity
            className="h-full w-full flex-row items-center"
            onPress={openModal}
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
            transparent={false}
            onRequestClose={closeModal}
            onDismiss={closeModal}
          >
            <View className="h-20 justify-center bg-black">
              <View className="flex-row items-center h-full mt-8">
                <TouchableOpacity
                  onPress={closeModal}
                  className="w-16 items-center"
                >
                  <ArrowLeft size={30} color={"#fff"} />
                </TouchableOpacity>
                <TextInput
                  selectionColor={"#1DB954"}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                  placeholder="What do you want to play?"
                  placeholderTextColor={"#c4c4c4"}
                  className="text-base font-medium color-white w-10/12 h-full"
                />
              </View>
            </View>
            <View className="h-full bg-black px-2 py-1">
              {isSearching ? (
                <Text className="color-white text-center mt-4">
                  Searching...
                </Text>
              ) : (
                <TracksList
                  songs={songs}
                  sroll={true}
                  nestedScroll={true}
                  id="searchTrackList"
                  onSelectSong={() => closeModal()}
                />
              )}
            </View>
          </Modal>
        </View>
      </View>
      <View>
        <Text className="px-2 py-1 text-[18px] font-semibold text-white">
          Duyệt tìm tất cả
        </Text>
        <View className="flex-row flex-wrap px-2">
          {genres.map((item) => (
            <View key={item.id} className="w-1/2 ">
              <TrackListGenre genre={item} />
            </View>
          ))}
          <View className="pb-80" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
