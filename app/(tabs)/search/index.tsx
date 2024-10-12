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
  StyleSheet,
  Modal,
} from "react-native";
import { TrackListItem } from "@/components/TrackListItem";
import supabase from "@/utils/supabase";
import { Genre } from "@/utils/database.types";

// const data = [
//   {
//     id: "1",
//     title: "Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#E44E9E",
//   },
//   {
//     id: "2",
//     title: "Podcasts",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#276754",
//   },
//   {
//     id: "3",
//     title: "Live Events",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#905AD4",
//   },
//   {
//     id: "4",
//     title: "Made For You",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#2854a6",
//   },
//   {
//     id: "5",
//     title: "New Releases",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#9BAF29",
//   },
//   {
//     id: "6",
//     title: "Vietnamese Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#6D848E",
//   },
//   {
//     id: "7",
//     title: "Made For You",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#2854a6",
//   },
//   {
//     id: "8",
//     title: "New Releases",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#9BAF29",
//   },
//   {
//     id: "9",
//     title: "Vietnamese Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#6D848E",
//   },
//   {
//     id: "10",
//     title: "Made For You",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#2854a6",
//   },
//   {
//     id: "11",
//     title: "New Releases",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#9BAF29",
//   },
//   {
//     id: "12",
//     title: "Vietnamese Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#6D848E",
//   },
//   {
//     id: "13",
//     title: "Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#E44E9E",
//   },
//   {
//     id: "14",
//     title: "Podcasts",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#276754",
//   },
//   {
//     id: "15",
//     title: "Music",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#E44E9E",
//   },
//   {
//     id: "16",
//     title: "Podcasts",
//     imageUrl:
//       "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
//     bgColor: "#276754",
//   },
// ];

const SearchScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [genres, setGenres] = useState<Genre[]>([]); // Khai báo state với kiểu Genre[]

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const { data, error } = await supabase.from("Genre").select("*");

    if (error) {
      console.log("Error fetching genres:", error.message);
    } else {
      setGenres(data || []);
      console.log(genres);
    }
  };

  return (
    <ScrollView stickyHeaderIndices={[1]}>
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
          <Text className="text-white text-2xl font-bold pl-4">Search</Text>
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
              className="h-14 justify-center mt-7"
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
                  className="text-base font-medium color-gray-400 w-10/12 h-full"
                />
              </View>
            </View>
            <View className="h-full bg-black">
              {/* <View style={{alignItems:'center', justifyContent:'center',height:'80%',padding:30}}>
              <Text style={{color:'#fff', fontSize:18,fontWeight:700,padding:10}}>Phát nội dung bạn thích</Text>
              <Text style={{color:'#c4c4c4', fontSize:15,fontWeight:500}}>Tìm kiếm nghệ sĩ, bài hát, podcasts và nhiều nội </Text><Text style={{color:'#c4c4c4', fontSize:15,fontWeight:500}}> dung khác</Text>
            </View> */}
              <View>
                <Text className="color-white text-xl font-semibold p-5">
                  Các tìm kiếm gần đây
                </Text>
                <TrackListItem />
                <TrackListItem />
                <TrackListItem />
                <TrackListItem />
                <View className="w-full justify-center items-center py-5">
                  <TouchableOpacity className="border border-white h-7 rounded-full w-56 justify-center items-center">
                    <Text className="color-white text-xs font-semibold">
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
          Browse all
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

const styles = StyleSheet.create({});
export default SearchScreen;
