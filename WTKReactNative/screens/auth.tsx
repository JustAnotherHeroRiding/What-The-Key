import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { AuthScreenNavigationProp } from "../utils/types";

function AuthScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Text>Log In</Text>
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
});

export default AuthScreen;
