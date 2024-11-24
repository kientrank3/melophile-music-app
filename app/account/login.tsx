import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import supabase from "@/utils/supabase";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import store from "@/redux/store";

export default function Login() {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const { data: user, error: queryError } = await supabase
        .from("User")
        .select("id, user_name, password, phone_number, email, name, urlImage")
        .eq("user_name", username)
        .single();

      if (queryError || !user) {
        throw new Error("Tên đăng nhập không tồn tại.");
      }

      if (user.password !== password) {
        throw new Error("Mật khẩu không chính xác.");
      }

      const currentUser = store.getState().auth.user;

      // Chỉ dispatch nếu user mới khác với user hiện tại
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        dispatch(login(user));
      }
      // Lưu thông tin đăng nhập
      //await AsyncStorage.setItem("user", JSON.stringify(user));

      // Điều hướng đến Home
      Alert.alert("Đăng nhập thành công", "Chào mừng bạn quay lại!");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Lỗi đăng nhập", (error as Error).message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("@/assets/images/background.jpg")}
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
          onPress={() => router.push("/account/signup")}
        >
          <Text className="text-white font-bold text-center text-lg">
            Sign up free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-zinc-950 border rounded-full flex-row items-center justify-center space-x-4 mt-4 p-5">
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
        <TouchableOpacity onPress={toggleModal}>
          <Text className="text-white border3w font-bold  text-center text-lg mt-4 p-5">
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-start bg-black bg-opacity-50 p-4">
          <View className="bg-black p-6 rounded-t-3xl">
            <TouchableOpacity onPress={toggleModal} className="mb-4 self-start">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mb-6">Login</Text>
            <Text className="text-white text-lg font-bold mb-2">
              Your username
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="bg-gray-700 text-white p-4 rounded-lg mb-4"
              placeholder="Enter username"
              placeholderTextColor="#888"
            />
            <Text className="text-white text-lg font-bold mb-2">
              Your password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="bg-gray-700 text-white p-4 rounded-lg mb-4"
              placeholder="Enter password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            <TouchableOpacity
              className="bg-green-500 p-4 rounded-full mt-4"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-bold text-lg p-3">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
