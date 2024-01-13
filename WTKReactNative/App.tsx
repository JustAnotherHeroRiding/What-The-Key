import { ImageBackground, StyleSheet, View, TextStyle } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "./UiComponents/Reusable/LoadingSpinner";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./utils/supabase";
import { SessionProvider } from "./utils/Context/Session/SessionProvider";
import BottomNav from "./UiComponents/BottomNav";
import { ProfilePicProvider } from "./utils/Context/Profile/ProfileProvider";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [session, setSession] = useState<Session | null>(null)

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
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
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ProfilePicProvider>
          <SafeAreaProvider>
            <ImageBackground source={require('./assets/images/background.png')}
              style={StyleSheet.absoluteFill}>
              <SafeAreaView style={StyleSheet.absoluteFill}>
                <StatusBar style="auto" />
                <BottomNav />
              </SafeAreaView>
            </ImageBackground>
          </SafeAreaProvider >
        </ProfilePicProvider>
      </SessionProvider>
    </QueryClientProvider>

  );
}

