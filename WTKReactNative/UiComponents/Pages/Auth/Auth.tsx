import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import colors from '../../../assets/colors'
import * as WebBrowser from 'expo-web-browser'
import tw from '../../../utils/tailwindRN'
import { supabase } from '../../../utils/supabase'
import { Input } from 'react-native-elements'
import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import { CustomButton } from '../../Reusable/Common/CustomButtom'

WebBrowser.maybeCompleteAuthSession() // required for web only
const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
}

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  })
  if (error) throw error

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    await createSessionFromUrl(url)
  }
}

const sendMagicLink = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: 'example@email.com',
    options: {
      emailRedirectTo: redirectTo,
    },
  })

  if (error) throw error
  // Email sent.
}

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function logOut() {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }
  const styles = StyleSheet.create({
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
  })
  return (
    <View
      style={tw.style(
        `p-4 flex flex-col justify-center items-center bg-black mx-4 rounded-md my-auto border border-cream`,
      )}
    >
      <View style={tw.style(`py-4 self-stretch`)}>
        <Input
          className='text-white'
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
        />
      </View>
      <View style={tw`py-4 self-stretch`}>
        <Input
          className='text-white'
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          rightIcon={{
            type: 'font-awesome',
            name: passwordVisible ? 'eye-slash' : 'eye',
            color: 'gray',
            onPress: togglePasswordVisibility,
          }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!passwordVisible}
          placeholder='Password'
          autoCapitalize='none'
        />
      </View>
      <View style={tw.style(`py-4 mt-4 self-stretch`)}>
        <CustomButton
          title='Sign In'
          onPress={() => signInWithEmail()}
          txtStyle={tw`text-black`}
          btnStyle={tw`bg-cream`}
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <CustomButton
          title='Sign up'
          disabled={loading}
          onPress={() => signUpWithEmail()}
          txtStyle={tw`text-black`}
          btnStyle={tw`bg-beigeCustom`}
        />
      </View>
    </View>
  )
}
