import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  TextInput,
  Platform,
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
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: Platform.select({
  //     ios: "304315761919-rqmfqabghte1rtuq1co121sk2t1a4dgl.apps.googleusercontent.com",
  //     android:
  //       "304315761919-rqmfqabghte1rtuq1co121sk2t1a4dgl.apps.googleusercontent.com",
  //   }),
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     console.log("Google ID Token:", id_token); // Lưu thông tin người dùng vào Redux hoặc Supabase
  //     handleGoogleSignIn(id_token);
  //   }
  // }, [response]);
  // const handleGoogleSignIn = async (id_token: any) => {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithIdToken(id_token);

  //     if (error) throw new Error(error.message);

  //     const user = {
  //       id: parseInt(data.user.id, 10),
  //       user_name: data.user.user_metadata.username,
  //       email: data.user.email || "",
  //       name: data.user.user_metadata.full_name,
  //       urlImage: data.user.user_metadata.picture,
  //       phone_number: data.user.user_metadata.phone_number,
  //       password: "",
  //     };

  //     dispatch(login(user)); // Lưu thông tin người dùng vào Redux
  //     Alert.alert("Đăng nhập thành công", "Chào mừng bạn quay lại!");
  //     router.replace("/(tabs)");
  //   } catch (error) {
  //     Alert.alert("Lỗi đăng nhập", (error as Error).message);
  //   }
  // };

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
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        dispatch(login(user));
      }

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
          <Text className="text-white font-bold text-center text-lg ">
            Sign up free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-zinc-950 border rounded-full flex-row items-center justify-center space-x-4 mt-4 p-5"
          // onPress={() => promptAsync()}
          // disabled={!request}
        >
          <FontAwesome name="google" size={24} color="red" />
          <Text className="text-white font-bold text-center text-lg pl-2">
            Sign up with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-zinc-950 border space-x-4 bg-grey rounded-full flex-row  items-center justify-center mt-4 p-5">
          <MaterialIcons name="facebook" size={24} color="blue" />
          <Text className="text-white font-bold text-center text-lg pl-2">
            Sign up with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-zinc-950 border rounded-full flex-row items-center justify-center mt-4 p-5 ">
          <AntDesign name="apple1" size={24} color="white" />
          <Text className="text-white font-bold text-center text-lg pl-2">
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
          <View className="flex flex-row justify-start gap-2 pt-6 items-center mb-2">
            <TouchableOpacity onPress={toggleModal} className="mr-2">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-3xl font-bold ">Login</Text>
          </View>
          <View className="bg-black rounded-t-3xl pt-4">
            <Text className="text-white text-2xl font-bold mb-2">
              Your username
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="bg-gray-700 text-white p-5 rounded mb-4"
            />
            <Text className="text-white text-2xl font-bold mb-2">
              Your password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="bg-gray-700 text-white p-5 rounded mb-4"
              secureTextEntry
            />
            <TouchableOpacity
              className="bg-green-500 p-4 rounded-full mt-4"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-bold text-2xl p-3">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
