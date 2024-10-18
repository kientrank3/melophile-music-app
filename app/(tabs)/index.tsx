import { AlbumListItem } from "@/components/AlbumListItem";
import { ArtistItem } from "@/components/ArtistItem";
import { TrackListGenre } from "@/components/TrackListGenre";
import { TrackListItem } from "@/components/TrackListItem";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { getAllGenre } from "@/controllers/database";
import { Genre } from "@/utils/database.types";
import supabase from "@/utils/supabase";
import {
  BellRing,
  CirclePlay,
  History,
  HistoryIcon,
  Plus,
  Settings,
  Zap,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

const data = [
  {
    id: 1,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
  {
    id: 2,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
  {
    id: 3,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
  {
    id: 4,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
  {
    id: 5,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
  {
    id: 6,
    name: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
  },
];

const albums = [
  {
    id: 1,
    title: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Hieu Thu Hai",
  },
  {
    id: 2,
    title: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Hieu Thu Hai",
  },
  {
    id: 3,
    title: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Hieu Thu Hai",
  },
  {
    id: 4,
    title: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Hieu Thu Hai, Vu, Vu Cat Tuong, SonTung MTP",
  },
  {
    id: 5,
    title: "Hieu Thu Hai",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Hieu Thu Hai",
  },
  {
    id: 6,
    title: "Standing next to you (lofi)",
    image:
      "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
    artistName: "Jung Kook",
  },
];
const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]); // Khai báo state với kiểu Genre[]

  useEffect(() => {
    const fetchGenre = async () => {
      const data = await getAllGenre();
      setGenres(data || []);
    };
    fetchGenre();
  }, []);

  return (
    <ScrollView stickyHeaderIndices={[0]} className="mt-4">
      <View className="p-2 pb-2 flex-row justify-between items-center bg-black">
        <TouchableOpacity
          onPress={() => {
            setShowDrawer(true);
          }}
        >
          <Image
            className="w-10 h-10 rounded-full"
            source={{
              uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
            }}
            alt="image"
          />
        </TouchableOpacity>
        <View className="flex-row justify-between items-center w-1/4">
          <TouchableOpacity>
            <BellRing color={"#fff"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <History color={"#fff"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings color={"#fff"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="lg"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <TouchableOpacity className="flex-row items-center w-full">
              <Image
                className="w-10 h-10 rounded-full"
                source={{
                  uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
                }}
                alt="image"
              />
              <View className="pl-2">
                <Text className="text-white font-xl font-semibold">
                  Trần Đình Kiên
                </Text>
                <Text className="text-gray-400 font-sm">Xem hồ sơ</Text>
              </View>
            </TouchableOpacity>
          </DrawerHeader>
          <DrawerBody className="border-t border-gray-700">
            <TouchableOpacity className="flex-row items-center py-2">
              <Plus color={"#fff"} size={20} />
              <Text className="text-white font-xl pl-2">Thêm tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-2">
              <Zap color={"#fff"} size={20} />
              <Text className="text-white font-xl pl-2">Thông tin mới</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-2">
              <HistoryIcon color={"#fff"} size={20} />
              <Text className="text-white font-xl pl-2">Nội dung đã nghe</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center py-2">
              <Settings color={"#fff"} size={20} />
              <Text className="text-white font-xl pl-2">
                Cài đặt và quyền riêng tư
              </Text>
            </TouchableOpacity>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <View className="p-2">
        <Text className="text-white text-xl font-bold">
          Nghệ sĩ yêu thích của bạn
        </Text>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return <ArtistItem name={item.name} imageUrl={item.image} />;
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="p-2">
        <Text className="text-white text-xl font-bold py-2">
          Album phổ biến
        </Text>
        <View>
          <FlatList
            data={albums}
            renderItem={({ item }) => {
              return (
                <AlbumListItem
                  title={item.title}
                  imageUrl={item.image}
                  artistName={item.artistName}
                  isCollab={false}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="p-2">
        <Text className="text-white text-xl font-bold py-2">
          Được đề xuất cho hôm nay
        </Text>
        <View>
          <FlatList
            data={albums}
            renderItem={({ item }) => {
              return (
                <AlbumListItem
                  title={item.title}
                  imageUrl={item.image}
                  artistName={item.artistName}
                  isCollab={true}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="p-2">
        <Text className="text-white text-xl font-bold py-2">Chủ đề</Text>
        <View>
          <FlatList
            data={genres}
            renderItem={({ item }) => {
              return (
                <View className="w-60">
                  <TrackListGenre
                    title={item.title}
                    imageUrl={item.imageUrl}
                    bgColor={item.color}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="p-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold py-2">
            Nhạc thịnh hành
          </Text>
          <CirclePlay />
        </View>
        <View className="bg-gray-800 rounded-xl p-1">
          <TrackListItem />
          <TrackListItem />
          <TrackListItem />
          <TrackListItem />
          <TrackListItem />
        </View>
      </View>
      <View className="p-2">
        <Text className="text-white text-xl font-bold py-2">
          Thêm nhạc bạn thích
        </Text>
        <View>
          <FlatList
            data={albums}
            renderItem={({ item }) => {
              return (
                <AlbumListItem
                  title={item.title}
                  imageUrl={item.image}
                  artistName={item.artistName}
                  isCollab={true}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View className="pb-60" />
    </ScrollView>
  );
};

export default HomeScreen;
