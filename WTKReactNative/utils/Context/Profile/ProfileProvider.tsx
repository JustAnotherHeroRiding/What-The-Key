import React, { createContext, useState, useContext, useEffect } from 'react'
import { SessionContext } from '../Session/SessionContext'
import { supabase } from '../../config/supabase'

interface ProfilePicContextType {
  profilePicUrl: string | null
  setProfilePicUrl: React.Dispatch<React.SetStateAction<string | null>>
  trackLimitEnabled: boolean
  setTrackLimitEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfilePicContext = createContext<ProfilePicContextType>({
  profilePicUrl: null,
  setProfilePicUrl: () => {},
  trackLimitEnabled: false,
  setTrackLimitEnabled: () => {},
})

interface ProfilePicProviderProps {
  children: React.ReactNode
}

export const ProfilePicProvider = ({ children }: ProfilePicProviderProps) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null)
  const [trackLimitEnabled, setTrackLimitEnabled] = useState(false)
  const session = useContext(SessionContext)

  useEffect(() => {
    if (session && !profilePicUrl) {
      // If this check is removed the profile pic is not fetched correctly
      supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', session.user.id)
        .single()
        .then(data => {
          setProfilePicUrl(data.data?.avatar_url)
        })
    }
  }, [session])

  return (
    <ProfilePicContext.Provider value={{ profilePicUrl, setProfilePicUrl, trackLimitEnabled, setTrackLimitEnabled }}>
      {children}
    </ProfilePicContext.Provider>
  )
}
