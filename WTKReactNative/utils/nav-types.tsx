import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { dataSource } from './track-service-types'

export type RootStackParamList = {
  MainTab: {
    Home: undefined
    LibraryOrDeleted: { type: dataSource }
    Auth: undefined
  }

  SingleTrack: { trackId: string }
}

export type HomeScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Home'>
export type LibraryOrDeletedScreenNavigationProp = BottomTabNavigationProp<
  RootStackParamList['MainTab'],
  'LibraryOrDeleted'
>
export type AuthScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Auth'>

export type SingleTrackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SingleTrack'>
