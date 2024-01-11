import { createBottomTabNavigator, BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StyleProp, TextStyle, Image, Text, View, StyleSheet } from "react-native";
import colors from "../assets/colors";
import DeletedScreen from "../screens/deleted";
import HomeScreen from "../screens/home";
import LibraryScreen from "../screens/library";
import { useContext, useEffect } from "react";
import { SessionContext } from "../utils/Context/Session/SessionContext";
import AuthScreen from "../screens/AuthScreen";
import { ProfilePicContext } from "../utils/Context/Profile/ProfileProvider";
import Avatar from "./Pages/Auth/Avatar";
import { BlurView } from "expo-blur";
import tw from "../utils/tailwindRN";

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent"
    }
};

const Tab = createBottomTabNavigator();


export default function BottomNav() {

    const session = useContext(SessionContext)

    const { profilePicUrl } = useContext(ProfilePicContext);



    return (
        <NavigationContainer theme={navTheme}>
            <Tab.Navigator
                key={session ? 'logged-in' : 'logged-out'} // Add this line
                screenOptions={({ route }) => ({
                    tabBarBackground: () => {
                        return <BlurView intensity={60} style={tw.style(`opacity-60
                        rounded-t-full bg-stone-900`, { ...StyleSheet.absoluteFillObject })} />
                    },
                    tabBarIcon: ({ focused }) => {
                        let imageSource;

                        if (route.name === 'Home') {
                            imageSource =
                                require('../assets/images/home.png')
                        } else if (route.name === 'Library') {
                            imageSource =
                                require('../assets/images/library.png')
                        } else if (route.name === 'Deleted') {
                            imageSource =
                                require('../assets/images/deleted.png')
                        } else if (route.name === 'Auth') {
                            if (profilePicUrl) {
                                return <Avatar
                                    size={25}
                                    url={profilePicUrl}
                                    location='nav'
                                />
                            }
                            imageSource = require('../assets/images/default-user.png')
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
                        } else if (route.name === 'Auth') {
                            label = session ? "Profile" : "Log In";
                        }

                        return <Text style={customStyle}>{label}</Text>;
                    },
                    tabBarActiveTintColor: colors.beigeCustom,
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "transparent",
                        position: "absolute",
                        borderTopWidth: 0,
                        elevation: 0, // Removes shadow on Android
                        shadowOpacity: 0, // Removes shadow on iOS
                        borderTopLeftRadius: 9999,
                        borderTopRightRadius: 9999,
                        overflow: "hidden",

                    },
                    headerShown: false,
                    tabBarHideOnKeyboard: true,

                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                {session && (
                    <>
                        <Tab.Screen name="Library" component={LibraryScreen} />
                        <Tab.Screen name="Deleted" component={DeletedScreen} />
                    </>
                )}
                <Tab.Screen name="Auth"
                    component={AuthScreen} />
            </Tab.Navigator>
        </NavigationContainer >
    )
}