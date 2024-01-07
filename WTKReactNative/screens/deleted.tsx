import React from "react";
import { Text, Button, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { DeletedScreenNavigationProp } from "../utils/types";
import tw from "../utils/tailwindRN";

function DeletedScreen({
  navigation,
}: {
  navigation: DeletedScreenNavigationProp;
}) {
  return (
    <ScrollView contentContainerStyle={tw`flex items-center justify-center flex-1 flex-col`} >
      <Text className="bg-black text-white px-4">Deleted</Text>
    </ScrollView>
  );
}

export default DeletedScreen;
