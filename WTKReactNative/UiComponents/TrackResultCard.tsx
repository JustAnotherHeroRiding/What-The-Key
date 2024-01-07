import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getNoteName } from "../utils/note-key";
import { TrackData } from "../utils/spotify-types";
import colors from "../assets/colors";

interface ResultCardProps {
  trackData: TrackData;
  // Include analysisData type if needed
}
const screen = Dimensions.get("window");
const imageSize = screen.width * 0.85; // 90% of screen width

const ResultCard = ({ trackData }: ResultCardProps) => {
  if (!trackData) {
    return (
      <View style={styles.card}>
        <Text>No data available</Text>
      </View>
    );
  }


  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{trackData.track.name}</Text>
      <Text style={styles.artistNameText}>
        {trackData.track.artists[0].name}
      </Text>
      {trackData.track.album.images[0] && (
        <Image
          source={{ uri: trackData.track.album.images[0].url }}
          style={styles.albumImage}
          alt={trackData.track.name}
        />
      )}
      <Text style={styles.cardText}>
        Key: {getNoteName(trackData.audioFeatures.key)} {trackData.audioFeatures.mode === 1 ? "Major" : "Minor"}
      </Text>
      <Text style={styles.cardText}>BPM: {trackData.audioFeatures.tempo}</Text>
      <Text style={styles.cardText}>
        Year: {new Date(trackData.track.album.release_date).getFullYear()}
      </Text>
      <TouchableOpacity
        style={styles.btnSave}
      //       onPress={() => onSave(trackData.uri.split(":")[2])}
      >
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.cream,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    // React Native does not support boxShadow, but elevation works for Android
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
    marginTop: 16,
  },
  albumImage: {
    maxWidth: imageSize,
    width: imageSize,
    height: 300,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.cream, // Replace with the hex value of --cream
    marginBottom: 16,
    objectFit: "contain",
  },
  cardText: {
    maxWidth: 160, // 10em (assuming 1em = 16 for simplicity)
    textAlign: "center",
    color: "white",
    fontFamily: "figtree-bold",
    marginBottom: 10,
    fontSize: 16,
  },

  artistNameText: {
    maxWidth: 160, // 10em (assuming 1em = 16 for simplicity)
    textAlign: "center",
    color: colors.artistGray,
    fontFamily: "figtree-bold",
    marginBottom: 10,
    fontSize: 16,
  },
  btnSave: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    fontSize: 20, // 1.3em (assuming 1em = 15 for simplicity)
    backgroundColor: colors.cream, // Replace with the hex value of --cream
    fontWeight: "800",
    elevation: 3, // For shadow in Android
    marginTop: "auto",
    marginLeft: "auto",
  },
  btnText: {
    fontFamily: "figtree-black",
  },
});

export default ResultCard;
