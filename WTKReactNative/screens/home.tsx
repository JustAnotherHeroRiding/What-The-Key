import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ImageBackground,
  Image
} from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { HomeScreenNavigationProp } from "../utils/types";
import { TrackData } from "../utils/spotify-types";
import ResultCard from "../UiComponents/TrackResultCard";
import LoadingSpinner from "../UiComponents/LoadingSpinner";

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [randomTrack, setRandomTrack] = useState<TrackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const fetchRandomTrack = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://what-the-key.vercel.app/api/spotify/random-guitar-track"
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching track");
      }
      const responseExtended = await fetch(
        `https://what-the-key.vercel.app/api/spotify/track/${data.tracks[0].id}`
      );
      const dataExtended = await responseExtended.json();

      if (!responseExtended.ok) {
        throw new Error(dataExtended.message || "Error fetching track");
      }

      setRandomTrack(dataExtended);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
  <ImageBackground source={require('../assets/images/background.png')}
    style={StyleSheet.absoluteFill}
  >
    <ScrollView
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="auto" />
      <View style={styles.blackContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
        />
        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.btnRandom} onPress={fetchRandomTrack}>
            <Text style={styles.btnText}>Random Track</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <LoadingSpinner />}

      {randomTrack && <ResultCard trackData={randomTrack} />}
    </ScrollView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({

  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  blackContainer: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginTop: "3%"
  },
  btnRandom: {
    backgroundColor: colors.beigeCustom,
    padding: 10,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20, // Spacing between elements
    color: "black", // Text color
  },
  searchButton: {
    backgroundColor: colors.beigeCustom,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "figtree-bold",
    color: "black",
    fontSize: 16,
    textAlign: "center", // Center the text in the button
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
  },
});

export default HomeScreen;
