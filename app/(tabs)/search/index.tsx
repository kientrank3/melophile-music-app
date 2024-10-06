import { TrackListGenre } from "@/components/TrackListGenre";
import { Camera, Search } from "lucide-react-native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";

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
          <Search color={"#000"} />
          <TextInput
            placeholderTextColor="#c4c4c4"
            placeholder="What do you want to play ?"
            style={{
              fontSize: 16,
              fontWeight: 600,
              height: "100%",
              width: "100%",
              color: "#000",
              paddingLeft: 10,
            }}
          />
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

export default SearchScreen;
