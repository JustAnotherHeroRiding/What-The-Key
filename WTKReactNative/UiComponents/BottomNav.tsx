import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../assets/colors'
import HomeScreen from '../screens/MainTab/home'
import { useContext } from 'react'
import { SessionContext } from '../utils/Context/Session/SessionContext'
import AuthScreen from '../screens/MainTab/AuthScreen'
import { ProfilePicContext } from '../utils/Context/Profile/ProfileProvider'
import Avatar from './Pages/Auth/Avatar'
import { BlurView } from 'expo-blur'
import tw from '../utils/config/tailwindRN'
import LibraryOrDeletedScreen from '../screens/MainTab/LibraryOrDeleted'
import SingleTrackScreen from '../screens/SingleTrack/SingleTrackScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/types/nav-types'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import IntervalsScreen from '../screens/SingleTrack/Intervals'
import ScalesScreen from '../screens/SingleTrack/Scales'
import ModesScreen from '../screens/SingleTrack/Modes'
import StudyScreen from '../screens/MainTab/Study'
import { useOrientation } from '../utils/Context/OrientationProvider'
import TriadsScreen from '../screens/SingleTrack/Triads'
import TwelveBars from '../screens/SingleTrack/TwelveBars'

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
}

export const CustomHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation()
  return (
    <View style={tw.style(`h-12 bg-zinc-800 flex items-center justify-center flex-row border-b-2 border-beigeCustom`)}>
      <TouchableOpacity style={tw.style(`absolute left-0 px-2 py-1`)} onPress={() => navigation.goBack()}>
        <AntDesign name='arrowleft' size={36} color='white' />
      </TouchableOpacity>
      <Text style={tw.style(`text-white text-center text-2xl`, { fontFamily: 'figtree-bold' })}>{title}</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator<RootStackParamList['MainTab']>()
const Stack = createNativeStackNavigator<RootStackParamList>()
const SingleTrackStack = createNativeStackNavigator<RootStackParamList['SingleTrackNavigator']>()

export default function BottomNav() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ animation: 'none' }}>
        <Stack.Screen name='MainTab' component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen
          name='SingleTrackNavigator'
          component={SingleTrackNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const SingleTrackNavigator = () => {
  return (
    <SingleTrackStack.Navigator initialRouteName='SingleTrackOverview'>
      <SingleTrackStack.Screen
        name='SingleTrackOverview'
        component={SingleTrackScreen}
        options={{
          header: () => <CustomHeader title='Play' />,
        }}
      />
      <SingleTrackStack.Screen
        name='Intervals'
        component={IntervalsScreen}
        options={{
          header: () => <CustomHeader title='Intervals' />,
        }}
      />
      <SingleTrackStack.Screen
        name='Scales'
        component={ScalesScreen}
        options={{
          header: () => <CustomHeader title='Scales' />,
        }}
      />
      <SingleTrackStack.Screen
        name='Modes'
        component={ModesScreen}
        options={{
          header: () => <CustomHeader title='Modes' />,
        }}
      />
      <SingleTrackStack.Screen
        name='Triads'
        component={TriadsScreen}
        options={{
          header: () => <CustomHeader title='Modes' />,
        }}
      />
      <SingleTrackStack.Screen
        name='TwelveBars'
        component={TwelveBars}
        options={{
          header: () => <CustomHeader title='Twelve Bars' />,
        }}
      />
    </SingleTrackStack.Navigator>
  )
}

const BottomTab = () => {
  const session = useContext(SessionContext)
  const { profilePicUrl } = useContext(ProfilePicContext)
  const { isLandscape } = useOrientation()

  return (
    <Tab.Navigator
      key={session ? 'logged-in' : 'logged-out'} // Add this line
      screenOptions={({ route }) => ({
        tabBarBackground: () => {
          return (
            <BlurView
              intensity={60}
              style={tw.style(
                `opacity-60
                        rounded-t-full bg-stone-900`,
                { ...StyleSheet.absoluteFillObject },
              )}
            />
          )
        },
        tabBarIcon: ({ focused }) => {
          let imageSource

          if (route.name === 'Home') {
            imageSource = require('../assets/images/home.png')
          } else if (route.name === 'Library') {
            imageSource = require('../assets/images/library.png')
          } else if (route.name === 'Deleted') {
            imageSource = require('../assets/images/deleted.png')
          } else if (route.name === 'Auth') {
            if (profilePicUrl) {
              return <Avatar size={24} url={profilePicUrl} location='nav' />
            }
            imageSource = require('../assets/images/default-user.png')
          } else if (route.name === 'Study') {
            imageSource = require('../assets/images/study.png')
          }

          return (
            <Image
              source={imageSource}
              style={tw.style(`w-6 h-6 rounded-full  ${isLandscape ? 'absolute left-1/2 bottom-2 ml-2' : ''}`)}
            />
          )
        },
        tabBarLabel: ({ focused, color }) => {
          let label

          switch (route.name) {
            case 'Home':
              label = 'Home'
              break
            case 'Library':
              label = 'Library'
              break
            case 'Auth':
              label = session ? 'Profile' : 'Log In'
              break
            case 'Deleted':
              label = 'Deleted'
              break
            case 'Study':
              label = 'Study'
          }

          return (
            <Text
              style={tw.style(
                `${focused ? 'text-beigeCustom' : 'text-slate-300'} 
                ${isLandscape && route.name !== 'Auth' ? 'absolute left-1/2 bottom-8 ' : route.name === 'Auth' && isLandscape ? 'absolute bottom-8' : ''} `,
                {
                  fontFamily: focused ? 'figtree-bold' : 'figtree-regular',
                },
              )}
            >
              {label}
            </Text>
          )
        },
        tabBarActiveTintColor: colors.beigeCustom,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          borderTopLeftRadius: 9999,
          borderTopRightRadius: 9999,
          overflow: 'hidden',
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      {session && (
        <>
          <Tab.Screen
            name='Library'
            component={LibraryOrDeletedScreen}
            initialParams={{ type: 'library' }}
            options={{ title: 'Library' }}
          />
          <Tab.Screen
            name='Deleted'
            component={LibraryOrDeletedScreen}
            initialParams={{ type: 'recycleBin' }}
            options={{ title: 'Deleted' }}
          />
        </>
      )}
      <Tab.Screen name='Study' component={StudyScreen} />
      <Tab.Screen name='Auth' component={AuthScreen} />
    </Tab.Navigator>
  )
}
