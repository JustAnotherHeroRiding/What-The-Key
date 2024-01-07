import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ImageBackground, StyleSheet, View } from "react-native";
import colors from "./assets/colors";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home";
import LibraryScreen from "./screens/library";
import DeletedScreen from "./screens/deleted";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./screens/auth";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "figtree-regular": require("./assets/fonts/figtree_regular.ttf"),
        "figtree-bold": require("./assets/fonts/figtree_bold.ttf"),
        "figtree-black": require("./assets/fonts/figtree_black.ttf"),
        "figtree-semibold": require("./assets/fonts/figtree_semibold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={StyleSheet.absoluteFill}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarLabelStyle: styles.navText,
                tabBarActiveTintColor: colors.beigeCustom,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                  backgroundColor: "black",
                },
                headerShown: false,
              }}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Library" component={LibraryScreen} />
              <Tab.Screen name="Deleted" component={DeletedScreen} />
              <Tab.Screen name="Log In" component={AuthScreen} />
            </Tab.Navigator>
          </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "scroll",
  },
  navText: {
    color: colors.cream,
    fontSize: 16,
  },
});
