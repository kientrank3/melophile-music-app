import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Login() {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../assets/images/background.jpg")}
          className="w-full h-full"
        />
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-3xl font-bold mt-10">
          Millions of Songs.
        </Text>
        <Text className="text-white text-lg">Free on Melopile.</Text>
      </View>

      <View className="p-4">
        <TouchableOpacity
          className="bg-green-500 border p-5 rounded-full flex-row space-x-4 items-center justify-center"
          onPress={() => router.push("/signup")}
        >
          <Text className="text-white font-bold text-center text-lg">
            Sign up free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-zinc-950 border rounded-full flex-row items-center justify-center space-x-4 mt-4 p-5"
          onPress={toggleModal}
        >
          <FontAwesome name="google" size={24} color="red" />
          <Text className="text-white font-bold text-center text-lg">
            Sign up with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-zinc-950 border space-x-4 bg-grey rounded-full flex-row  items-center justify-center mt-4 p-5">
          <MaterialIcons name="facebook" size={24} color="blue" />
          <Text className="text-white font-bold text-center text-lg">
            Sign up with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-zinc-950 border rounded-full flex-row items-center justify-center mt-4 p-5">
          <AntDesign name="apple1" size={24} color="white" />
          <Text className="text-white font-bold text-center text-lg">
            Sign up with Apple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-white border3w font-bold  text-center text-lg mt-4 p-5">
            Login
          </Text>
        </TouchableOpacity>
        {/* Modal
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <SongDetail />
        </Modal> */}
      </View>
    </SafeAreaView>
  );
}
