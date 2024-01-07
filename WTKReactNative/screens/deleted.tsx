import React from "react";
import { Text, Button, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { DeletedScreenNavigationProp } from "../utils/types";

function DeletedScreen({
  navigation,
}: {
  navigation: DeletedScreenNavigationProp;
}) {
  return (
    <ScrollView style={styles.container}>
      <Text>Deleted</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default DeletedScreen;
