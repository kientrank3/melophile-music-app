import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import supabase from "@/utils/supabase";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !name || !phoneNumber || !username) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!termsAccepted) {
      Alert.alert("Error", "You must accept the terms to create an account.");
      return;
    }

    const defaultAvatarUrl =
      "https://seurmazgxtotnrbiypmg.supabase.co/storage/v1/object/public/userImage/user.png"; // URL của avatar mặc định

    try {
      // Gửi thông tin đăng ký tới cơ sở dữ liệu
      const { data, error } = await supabase
        .from("User")
        .insert({
          email,
          password, // Bạn nên hash mật khẩu trước khi lưu vào cơ sở dữ liệu
          name,
          phone_number: phoneNumber,
          user_name: username,
          urlImage: defaultAvatarUrl, // Avatar mặc định
        })
        .select("*");

      if (error) {
        throw error;
      }

      const newUser = data[0];

      // Đăng ký thành công, tự động đăng nhập
      Alert.alert("Success", "Account created successfully!");
      dispatch(
        login({
          id: newUser.id,
          email,
          name,
          phone_number: phoneNumber,
          user_name: username,
          password,
          urlImage: defaultAvatarUrl,
        })
      );
      router.replace("/(tabs)"); // Chuyển đến Home
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-black p-4 mt-4">
      <View className="flex flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold ">Create account</Text>
      </View>

      <Text className="text-white text-2xl font-bold mb-2">
        What's your email?
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4">
        Your'll need to confirm this email later.
      </Text>

      <Text className="text-white text-2xl font-bold mb-2">
        Create an username
      </Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4"></Text>

      <Text className="text-white text-2xl font-bold mb-2">
        Create a password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4">Use at least 8 characters.</Text>

      <Text className="text-white text-2xl font-bold mb-2">
        What's your phone number?
      </Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        secureTextEntry
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4"></Text>

      <Text className="text-white text-2xl font-bold mb-2">
        What's your name?
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4">
        This appears on your Melophile profile.
      </Text>

      <Text className="text-gray-400 mb-4 mt-4">
        By tapping "Create account", you agree to the Melophile Terms of Use.
      </Text>

      <CheckBox
        title="Please send me news and offers from Melophile."
        checked={termsAccepted}
        onPress={() => setTermsAccepted(!termsAccepted)}
        className="bg-gray-700"
        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
      />

      <TouchableOpacity
        className="bg-green-500 p-4 rounded-full mb-4"
        onPress={handleSignup}
      >
        <Text className="text-white text-center text-lg">
          Create an account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default SignupScreen;
