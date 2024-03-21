import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Audio, AVPlaybackSource, AVPlaybackStatusSuccess } from 'expo-av'
import { SoundContextType, AllSounds, SoundFilesType, StringNames, FretNumber } from '../consts/soundFilesTypes'
import { Sound } from 'expo-av/build/Audio'

const defaultContextValue: SoundContextType = {
  sounds: {}, // Initially empty
  loadSounds: async () => {}, // A no-op function until replaced
  playSound: async () => {},
}

const SoundContext = createContext<SoundContextType>(defaultContextValue)

interface SoundPlayerProps {
  children: ReactNode
}

export const SoundProvider = ({ children }: SoundPlayerProps) => {
  const [sounds, setSounds] = useState<SoundFilesType>({}) // Use the AllSounds type

  const loadSounds = async (soundFiles: SoundFilesType) => {
    setSounds(soundFiles)
  }

  const playSound = async (
    sound: Sound | undefined,
    setSound: React.Dispatch<React.SetStateAction<Sound | undefined>>,
    string: StringNames,
    fret: FretNumber,
  ) => {
    if (sound) {
      await sound.unloadAsync()
      setSound(undefined)
    }
    if (sounds[string] && fret in sounds[string]!) {
      const soundToPlay = sounds[string]?.[fret]
      const { sound: loadedSound } = await Audio.Sound.createAsync(soundToPlay as AVPlaybackSource)

      setSound(loadedSound)
      await loadedSound.playAsync()
      loadedSound.setOnPlaybackStatusUpdate(async status => {
        if ((status as AVPlaybackStatusSuccess).didJustFinish) {
          await loadedSound.unloadAsync()
          setSound(undefined)
        }
      })
      // Consider handling unload/release here if it's not managed globally
    } else {
      console.warn(`No sound file loaded for string ${string} and fret ${fret}`)
    }
  }

  return <SoundContext.Provider value={{ sounds, loadSounds, playSound }}>{children}</SoundContext.Provider>
}

// Hook to use sound context
export const useSounds = () => useContext(SoundContext)
