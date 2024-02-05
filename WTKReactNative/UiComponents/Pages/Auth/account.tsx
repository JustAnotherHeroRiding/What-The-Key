import React, { useState, useEffect, useContext } from 'react'
import { supabase } from '../../../utils/config/supabase'
import { View, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import tw from '../../../utils/config/tailwindRN'
import { CustomButton } from '../../Reusable/Common/CustomButtom'
import Avatar from './Avatar'
import { ProfilePicContext } from '../../../utils/Context/Profile/ProfileProvider'
import { LinearGradient } from 'expo-linear-gradient'
export interface Profile {
  id?: string
  username: string
  avatar_url: string
  full_name: string
  updated_at: Date
}

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [fullName, setFullName] = useState('')

  const { setProfilePicUrl } = useContext(ProfilePicContext)

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setFullName(data.full_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    full_name,
  }: {
    username: string
    avatar_url: string
    full_name: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates: Profile = {
        id: session?.user.id,
        username,
        avatar_url,
        full_name,
        updated_at: new Date(),
      }

      console.log('Updating profile with:', updates) // Log the data being sent

      const data = await supabase
        .from('profiles')
        .upsert(updates)
        .then(data => {
          console.log('Supabase response:', data) // Log the response from Supabase
          if (Error) {
            throw Error
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={['#27272a', '#52525b']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={tw.style(`flex flex-col justify-center items-center
     bg-black text-white mx-4 p-4 rounded-md my-auto border border-cream mb-16`)}
    >
      <View style={tw.style(`py-2 flex justify-center items-center`)}>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            setProfilePicUrl(url)
            updateProfile({ username, avatar_url: url, full_name: fullName })
          }}
          location='profile'
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input
          style={tw.style(`text-white`)}
          labelStyle={tw.style(`text-slate-300`)}
          label='Email'
          value={session?.user?.email}
          disabled
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input
          style={tw.style(`text-white`)}
          labelStyle={tw.style(`text-slate-300`)}
          label='Username'
          value={username || ''}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input
          style={tw.style(`text-white`)}
          labelStyle={tw.style(`text-slate-300`)}
          label='Full Name'
          value={fullName || ''}
          onChangeText={text => setFullName(text)}
        />
      </View>
      <View style={tw.style(`self-stretch py-4 mt-4`)}>
        <CustomButton
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, avatar_url: avatarUrl, full_name: fullName })}
          txtStyle={tw`text-black`}
          btnStyle={tw`bg-cream`}
          disabled={loading}
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <CustomButton
          title='Sign Out'
          onPress={() => {
            setProfilePicUrl(null)
            supabase.auth.signOut()
          }}
          txtStyle={tw`text-black`}
          btnStyle={tw`bg-cream`}
        />
      </View>
    </LinearGradient>
  )
}
