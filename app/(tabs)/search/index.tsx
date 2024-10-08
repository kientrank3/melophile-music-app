import { TrackListGenre } from "@/components/TrackListGenre";
import { ArrowLeft, Camera, Search } from "lucide-react-native";
import { useState } from "react";
import { colors } from "@/constants/Tokens";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { BlurView } from "expo-blur";
import { TrackListItem } from "@/components/TrackListItem";

const data = [
  {
    id: "1",
    title: "Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#E44E9E",
  },
  {
    id: "2",
    title: "Podcasts",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#276754",
  },
  {
    id: "3",
    title: "Live Events",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#905AD4",
  },
  {
    id: "4",
    title: "Made For You",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#2854a6",
  },
  {
    id: "5",
    title: "New Releases",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#9BAF29",
  },
  {
    id: "6",
    title: "Vietnamese Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#6D848E",
  },
  {
    id: "7",
    title: "Made For You",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#2854a6",
  },
  {
    id: "8",
    title: "New Releases",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#9BAF29",
  },
  {
    id: "9",
    title: "Vietnamese Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#6D848E",
  },
  {
    id: "10",
    title: "Made For You",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#2854a6",
  },
  {
    id: "11",
    title: "New Releases",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#9BAF29",
  },
  {
    id: "12",
    title: "Vietnamese Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#6D848E",
  },
  {
    id: "13",
    title: "Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#E44E9E",
  },
  {
    id: "14",
    title: "Podcasts",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#276754",
  },
  {
    id: "15",
    title: "Music",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#E44E9E",
  },
  {
    id: "16",
    title: "Podcasts",
    imageUrl:
      "https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb",
    bgColor: "#276754",
  },
];

const SearchScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Image
              style={{ width: 40, height: 40, borderRadius: 40 }}
              source={{
                uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
              }}
              alt="image"
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 23,
              fontWeight: 700,
              paddingLeft: 18,
            }}
          >
            Search
          </Text>
        </View>
        <Camera style={{ width: 30, height: 30 }} color={"#fff"} />
      </View>
      <View style={{ padding: 10, backgroundColor: "#000" }}>
        <View
          style={{
            paddingLeft: 10,
            flexDirection: "row",
            backgroundColor: "#fff",
            height: 40,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            style={{
              height: "100%",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={toggleModal}
          >
            <Search color={"#000"} />

            <Text
              style={{
                paddingLeft: 20,
                color: "#c4c4c4",
                fontSize: 16,
                fontWeight: 600,
                width: "80%",
              }}
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
              style={{
                backgroundColor: "#282828",
                height: 60,
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{ width: 60, alignItems: "center" }}
                >
                  <ArrowLeft size={30} color={"#fff"} />
                </TouchableOpacity>
                <TextInput
                  selectionColor={"#1DB954"}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                  placeholder="What do you want to play ?"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#c4c4c4",
                    width: "80%",
                    height: "100%",
                  }}
                />
              </View>
            </View>
            <View style={{ height: "100%", backgroundColor: "#000" }}>
              {/* <View style={{alignItems:'center', justifyContent:'center',height:'80%',padding:30}}>
              <Text style={{color:'#fff', fontSize:18,fontWeight:700,padding:10}}>Phát nội dung bạn thích</Text>
              <Text style={{color:'#c4c4c4', fontSize:15,fontWeight:500}}>Tìm kiếm nghệ sĩ, bài hát, podcasts và nhiều nội </Text><Text style={{color:'#c4c4c4', fontSize:15,fontWeight:500}}> dung khác</Text>
            </View> */}
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 600,
                    padding: 20,
                  }}
                >
                  Các tìm kiếm gần đây
                </Text>
                <TrackListItem />
                <TrackListItem />
                <TrackListItem />
                <TrackListItem />
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "#fff",
                      height: 30,
                      borderRadius: 20,
                      width: 220,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}
                    >
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
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontSize: 18,
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Browse all
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.map((item) => (
            <View key={item.id} style={{ width: "50%" }}>
              <TrackListGenre
                title={item.title}
                imageUrl={item.imageUrl}
                bgColor={item.bgColor}
              />
            </View>
          ))}
          <View style={{ paddingBottom: 300 }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
export default SearchScreen;
