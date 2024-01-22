import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { dataSource } from './track-service-types'

export type RootStackParamList = {
  MainTab: {
    Home: undefined
    Library: { type: dataSource }
    Deleted: { type: dataSource }
    Auth: undefined
  }

  SingleTrack: { trackId: string }
}

export type HomeScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Home'>
export type LibraryScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Library'>
export type DeletedScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Deleted'>


export type AuthScreenNavigationProp = BottomTabNavigationProp<RootStackParamList['MainTab'], 'Auth'>

export type SingleTrackScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SingleTrack'>
