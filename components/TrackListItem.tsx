import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Image } from "./ui/image";
export type TracksListItemProps = {};

export const TrackListItem = () => {
  return (
    <TouchableHighlight>
      <View className="flex-row items-center px-5 py-2">
        <View>
          <Image
            size="xs"
            source={{
              uri: "https://i.vietgiaitri.com/2024/4/27/anh-trai-say-hi-hoi-tu-loat-ten-tuoi-cuc-hot-vi-sao-lai-co-30-thi-sinh-271-7150873.jpg",
            }}
            alt="image"
          />
        </View>
        <View className="flex-1">
          <Text className="text-white text-sm px-1">Anh Trai Say "Hi"</Text>
          <Text className="text-gray-300 text-xs px-1">HieuThuHai</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
