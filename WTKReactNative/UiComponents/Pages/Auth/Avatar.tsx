import { useState, useEffect } from 'react'
import { supabase } from '../../../utils/config/supabase'
import { View, Alert, Image } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { CustomButton } from '../../Reusable/Common/CustomButtom'
import tw from '../../../utils/config/tailwindRN'
import React from 'react'
import { useOrientation } from '../../../utils/Context/OrientationProvider'

interface Props {
  size: number
  url: string | null
  onUpload?: (filePath: string) => void
  location: 'nav' | 'profile'
}

export default function Avatar({ url, size = 150, onUpload, location }: Props) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarSize = { height: size, width: size }

  const { isLandscape } = useOrientation()

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      const file = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Specify the type of files you want the user to pick
        copyToCacheDirectory: true, // Copies picked files to app's cache directory
      })

      // Check if the file picking was cancelled
      if (file.canceled) {
        setUploading(false)
        return
      }

      // Ensure the file has a valid URI
      if (!file.assets || !file.assets[0].uri) {
        throw new Error('File is not valid for upload')
      }

      const formData = new FormData()
      //@ts-ignore This is a mismatch between react native expected types and the web
      // the append function expects a blob, but our document picker returns a different objects with the
      // same properties that we need
      formData.append('file', {
        uri: file.assets[0].uri,
        type: file.assets[0].mimeType || 'application/octet-stream', // Provide a fallback MIME type
        name: file.assets[0].name || 'fallback_image.jpg', // Provide a fallback file name
      })

      // Extract file extension and generate a file path
      const fileExt = file.assets[0].name?.split('.').pop() || 'jpg'
      const filePath = `${Math.random()}.${fileExt}`

      const { error } = await supabase.storage.from('avatars').upload(filePath, formData)

      if (error) {
        throw error
      }

      if (onUpload) {
        onUpload(filePath)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }
  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel='Avatar'
          style={[
            avatarSize,
            tw.style(
              `rounded-full overflow-hidden max-w-full pt-0 ${location === 'nav' ? 'border' : 'border-2'} border-beigeCustom`,
            ),
            { objectFit: 'cover' },
          ]}
        />
      ) : (
        <View style={[avatarSize, tw`rounded-full overflow-hidden max-w-full bg-gray-700 border border-cream`]} />
      )}
      {location === 'profile' && (
        <View style={tw`mt-4`}>
          <CustomButton
            title={uploading ? 'Uploading ...' : 'Upload'}
            onPress={uploadAvatar}
            disabled={uploading}
            btnStyle={tw`bg-beigeCustom`}
          />
        </View>
      )}
    </View>
  )
}
