import 'react-native-url-polyfill/auto'
import { useContext } from 'react'
import Auth from '../../UiComponents/Pages/Auth/Auth'
import Account from '../../UiComponents/Pages/Auth/account'
import { ScrollView } from 'react-native'
import { AuthScreenNavigationProp } from '../../utils/types/nav-types'
import { SessionContext } from '../../utils/Context/Session/SessionContext'
import React from 'react'

export default function AuthScreen({ navigation }: { navigation: AuthScreenNavigationProp }) {
  const session = useContext(SessionContext)

  return (
    <ScrollView>{session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}</ScrollView>
  )
}
