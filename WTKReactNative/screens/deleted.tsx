import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { DeletedScreenNavigationProp } from "../utils/types";

function DeletedScreen({
  navigation,
}: {
  navigation: DeletedScreenNavigationProp;
}) {
  return (
    <View style={styles.container}>
      <Text>Deleted</Text>
      <TouchableOpacity style={styles.btnRandom}>
        <Text style={styles.btnText}>Fetch Random Track</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <Button
        title="Go to Library"
        onPress={() => navigation.navigate("Library")}
      />
      <Button
        title="Go to Deleted"
        onPress={() => navigation.navigate("Deleted")}
      />
    </View>
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
  btnRandom: {
    backgroundColor: colors.beigeCustom,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "figtree-bold",
    color: "black",
    fontSize: 16,
  },
});

export default DeletedScreen;
