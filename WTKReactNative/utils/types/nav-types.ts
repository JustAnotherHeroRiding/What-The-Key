import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { Sources, dataSource } from './track-service-types'
import { TrackData } from './spotify-types'

export type RootStackParamList = {
  MainTab: {
    Home: undefined
    Library: { type: dataSource }
    Deleted: { type: dataSource }
    Auth: undefined
    Study: undefined
  }
  SingleTrackNavigator: {
    SingleTrackOverview: { trackId: string; src: Sources }
    Intervals: { track: TrackData }
    Scales: { track: TrackData }
    Modes: { track: TrackData }
  }
}

export type HomeScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Home'>
export type LibraryScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Library'>
export type DeletedScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Deleted'>

export type AuthScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Auth'>
export type StudyScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Study'>

export type SingleTrackOverviewNavigationProp = NativeStackNavigationProp<
  RootStackParamList['SingleTrackNavigator'],
  'SingleTrackOverview'
>
export type ChordsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList['SingleTrackNavigator'],
  'Intervals'
>
export type ScalesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList['SingleTrackNavigator'], 'Scales'>
export type ModesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList['SingleTrackNavigator'], 'Modes'>
