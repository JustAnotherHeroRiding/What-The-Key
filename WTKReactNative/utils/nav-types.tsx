import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { dataSource } from "./track-service-types";

export type RootStackParamList = {
  Home: undefined;
  LibraryOrDeleted: { type: dataSource };
  Deleted: undefined;
  Auth: undefined;
  SingleTrack: { trackId: string }
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type LibraryOrDeletedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LibraryOrDeleted"
>;

export type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Auth"
>;


export type SingleTrackScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SingleTrack"
>;
