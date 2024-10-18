import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold mb-6">Create account</Text>

      <Text className="text-gray-400 mb-2">What's your email?</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="You’ll need to confirm this email later."
        placeholderTextColor="#999"
        className="bg-gray-700 text-white p-4 rounded mb-4"
      />

      <Text className="text-gray-400 mb-2">Create a password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Use at least 8 characters."
        secureTextEntry
        placeholderTextColor="#999"
        className="bg-gray-700 text-white p-4 rounded mb-4"
      />

      <Text className="text-gray-400 mb-2">What's your name?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="This appears on your Spotify profile."
        placeholderTextColor="#999"
        className="bg-gray-700 text-white p-4 rounded mb-4"
      />

      <Text className="text-gray-400 mb-2">What's your gender?</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        placeholder="Enter your gender"
        placeholderTextColor="#999"
        className="bg-gray-700 text-white p-4 rounded mb-4"
      />

      <Text className="text-gray-400 mb-4">
        By tapping "Create account", you agree to the Spotify Terms of Use.
      </Text>

      <TouchableOpacity
        onPress={() => setTermsAccepted(!termsAccepted)}
        className="flex-row items-center mb-4"
      >
        {/* <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} /> */}
        <Text className="text-gray-400 ml-2">
          Please send me news and offers from Spotify.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-green-500 p-4 rounded-full mb-4">
        <Text className="text-white text-center text-lg">
          Create an account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;
