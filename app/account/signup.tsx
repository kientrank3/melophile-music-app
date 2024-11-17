import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "@rneui/themed";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const SignupScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const valueGender = [
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ];

  const renderLabel = () => {
    if (gender || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView className="flex-1 bg-black p-4 mt-4">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold mb-6">
          Create account
        </Text>
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
        What's your name?
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="bg-gray-700 text-white p-5 rounded"
      />
      <Text className="text-gray-400 mb-4">
        This appears on your Spotify profile.
      </Text>

      <Text className="text-white text-2xl font-bold mb-2">
        What's your gender?
      </Text>
      {/* <TextInput
        value={gender}
        onChangeText={setGender}
        placeholder="Enter your gender"
        placeholderTextColor="#999"
        className="bg-gray-700 text-white p-5 roundedbg-gray-700 text-white p-5 rounded mb-4"
      /> */}
      {renderLabel()}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={valueGender}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={gender}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setGender(item.value);
          setIsFocus(false);
        }}
      />

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

      <TouchableOpacity className="bg-green-500 p-4 rounded-full mb-4">
        <Text className="text-white text-center text-lg">
          Create an account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default SignupScreen;
