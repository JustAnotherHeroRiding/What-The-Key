import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ImageBackground, StyleSheet, View, Image, Text, StyleProp, TextStyle } from "react-native";
import colors from "./assets/colors";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "./screens/home";
import LibraryScreen from "./screens/library";
import DeletedScreen from "./screens/deleted";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreen from "./screens/auth";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "./UiComponents/LoadingSpinner";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

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
      <View className="flex flex-1 items-center justify-center flex-col overflow-auto">
        <LoadingSpinner />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <ImageBackground source={require('./assets/images/background.png')}
        style={StyleSheet.absoluteFill}
      >
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <NavigationContainer theme={navTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                  let imageSource;

                  if (route.name === 'Home') {
                    imageSource =
                      require('./assets/images/home.png')
                  } else if (route.name === 'Library') {
                    imageSource =
                      require('./assets/images/library.png')
                  } else if (route.name === 'Deleted') {
                    imageSource =
                      require('./assets/images/deleted.png')
                  } else if (route.name === 'Log In') {
                    imageSource =
                      require('./assets/images/default-user.png')
                  }

                  return <Image source={imageSource} style={{ width: 25, height: 25, borderRadius: 40, marginTop: 8 }} />;
                }, tabBarLabel: ({ focused, color }) => {
                  let label;
                  let customStyle: StyleProp<TextStyle> = {
                    color: focused ? colors.beigeCustom : colors.slate300,
                    fontFamily: focused ? 'figtree-bold' : 'figtree-regular',
                  };

                  if (route.name === 'Home') {
                    label = 'Home';
                  } else if (route.name === 'Library') {
                    label = 'Library';
                  } else if (route.name === 'Deleted') {
                    label = 'Deleted';
                  } else if (route.name === 'Log In') {
                    label = 'Log In';
                  }

                  return <Text style={customStyle}>{label}</Text>;
                },
                tabBarActiveTintColor: colors.beigeCustom,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                  backgroundColor: "black",
                },
                headerShown: false,
                tabBarHideOnKeyboard: true
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Library" component={LibraryScreen} />
              <Tab.Screen name="Deleted" component={DeletedScreen} />
              <Tab.Screen name="Log In" component={AuthScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider >
  );
}

