import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Deleted: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type LibraryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Library"
>;
export type DeletedScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Deleted"
>;
