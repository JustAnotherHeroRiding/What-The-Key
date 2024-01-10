import { useState, useEffect, useContext } from 'react'
import { supabase } from "../../../utils/supabase"
import { StyleSheet, View, Alert, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import tw from '../../../utils/tailwindRN'
import { CustomButton } from '../../Reusable/CustomButtom'
import Avatar from './Avatar'
import { ProfilePicContext } from '../../../utils/Context/Profile/ProfileProvider'
export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
  full_name: string;
  updated_at: Date;
}


export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
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
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
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
    website,
    avatar_url,
    full_name,
  }: {
    username: string
    website: string
    avatar_url: string
    full_name: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates: Profile = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date(),
      }


      console.log('Updating profile with:', updates); // Log the data being sent

      const data = await supabase.from('profiles').upsert(updates).then((data) => {
        console.log('Supabase response:', data); // Log the response from Supabase
        if (Error) {
          throw Error
        }

      });

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={tw.style(`flex flex-col justify-center items-center
     bg-black text-white mx-4 p-4 rounded-md my-auto border border-cream`)}>
      <View style={tw.style(`py-2 flex justify-center items-center`)}>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            setProfilePicUrl(url)
            updateProfile({ username, website, avatar_url: url, full_name: fullName })
          }}
          location='profile'
        />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input style={tw.style(`text-white`)} label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input style={tw.style(`text-white`)} label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input style={tw.style(`text-white`)} label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <Input style={tw.style(`text-white`)} label="Full Name" value={fullName || ''} onChangeText={(text) => setFullName(text)} />
      </View>
      <View style={tw.style(`self-stretch py-4 mt-4`)}>
        <CustomButton title={loading ? 'Loading ...' : 'Update'} onPress={() => updateProfile({ username, website, avatar_url: avatarUrl, full_name: fullName })}
          txtStyle={tw`text-black`} btnStyle={tw`bg-cream`} disabled={loading} />
      </View>
      <View style={tw.style(`self-stretch`)}>
        <CustomButton title="Sign Out" onPress={() => supabase.auth.signOut()} txtStyle={tw`text-black`} btnStyle={tw`bg-cream`} />
      </View>
    </View>
  )
}
