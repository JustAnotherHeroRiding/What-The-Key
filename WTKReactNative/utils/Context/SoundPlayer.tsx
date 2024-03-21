import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Audio } from 'expo-av'
import { SoundContextType, AllSounds, SoundFilesType, StringNames, FretNumber } from '../consts/soundFilesTypes'

const defaultContextValue: SoundContextType = {
  sounds: {}, // Initially empty
  loadSounds: async () => {}, // A no-op function until replaced
}

const SoundContext = createContext<SoundContextType>(defaultContextValue)

interface SoundPlayerProps {
  children: ReactNode
}

export const SoundProvider = ({ children }: SoundPlayerProps) => {
  const [sounds, setSounds] = useState<SoundFilesType>({}) // Use the AllSounds type

  const loadSounds = async (soundFiles: SoundFilesType) => {
    /*  const soundObjects: AllSounds = {} as AllSounds // Assure TypeScript of the object structure

    for (const stringKey of Object.keys(soundFiles) as StringNames[]) {
      // Initialize the object for this string if it doesn't exist
      if (!soundObjects[stringKey]) {
        soundObjects[stringKey] = {}
      }

      const frets = soundFiles[stringKey]
      if (!frets) continue // If for some reason there's no fret object, skip to the next iteration

      for (const key of Object.keys(frets)) {
        const fretKey = parseInt(key) as FretNumber // Assuming all keys can be validly parsed as numbers and fit the FretNumber type
        const file = frets[fretKey]
        if (!file) continue // Skip if file is undefined

        try {
          const { sound } = await Audio.Sound.createAsync(file)
          if (soundObjects[stringKey]) {
            // No longer optional here, we've already checked or initialized it
            soundObjects[stringKey]![fretKey] = sound // We can assert non-null with !
          }
        } catch (error) {
          console.error(`Failed to load sound for ${stringKey} ${fretKey}:`, error)
        }
      }
    } */

    setSounds(soundFiles)
  }

  return <SoundContext.Provider value={{ sounds, loadSounds }}>{children}</SoundContext.Provider>
}

// Hook to use sound context
export const useSounds = () => useContext(SoundContext)
