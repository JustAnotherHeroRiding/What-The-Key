import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { LibraryScreenNavigationProp } from "../utils/types";

function LibraryScreen({
  navigation,
}: {
  navigation: LibraryScreenNavigationProp;
}) {
  return (
    <View style={styles.container}>
      <Text>Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default LibraryScreen;
