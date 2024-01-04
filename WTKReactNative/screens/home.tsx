import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../assets/colors";
import { StatusBar } from "expo-status-bar";
import { HomeScreenNavigationProp } from "../utils/types";
import { RandomTrack, TrackData } from "../utils/spotify-types";
import ResultCard from "../UiComponents/TrackResultCard";

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [randomTrack, setRandomTrack] = useState<TrackData | null>(null);

  const fetchRandomTrack = async () => {
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

      setRandomTrack(dataExtended); // Update your state with the track data
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        // Handle non-Error objects thrown
        Alert.alert("Error", "An unknown error occurred");
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer} // Add this line
    >
      <StatusBar style="auto" />

      <View style={styles.blackContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
          // Add other properties for TextInput as needed
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
      {randomTrack && <ResultCard trackData={randomTrack} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    alignItems: "center", // Move alignItems here
  },
  blackContainer: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%", // Adjust width as per your website's design
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
