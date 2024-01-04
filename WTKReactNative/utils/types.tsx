import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Deleted: undefined;
  Auth: undefined;
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

export type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Auth"
>;
