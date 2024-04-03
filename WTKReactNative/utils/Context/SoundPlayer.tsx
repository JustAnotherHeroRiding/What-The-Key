import React, { createContext, ReactNode, useContext, useRef, useState } from 'react'
import { Audio, AVPlaybackSource, AVPlaybackStatusSuccess } from 'expo-av'
import { SoundContextType, SoundFilesType, StringNames, FretNumber } from '../consts/soundFilesTypes'
import { Sound } from 'expo-av/build/Audio'

const defaultContextValue: SoundContextType = {
  sounds: {}, // Initially empty
  loadSounds: async () => {},
  playSound: async () => {},
  stopSound: async () => {},
}

const SoundContext = createContext<SoundContextType>(defaultContextValue)

interface SoundPlayerProps {
  children: ReactNode
}

export const SoundProvider = ({ children }: SoundPlayerProps) => {
  const [sounds, setSounds] = useState<SoundFilesType>({})
  const activeSoundsRef = useRef<Record<StringNames, Sound | undefined>>({} as Record<StringNames, Sound | undefined>)

  const loadSounds = async (soundFiles: SoundFilesType) => {
    setSounds(soundFiles)
  }

  const stopSound = async (string: StringNames, fret: FretNumber) => {
    const activeSound = activeSoundsRef.current[string]

    if (activeSound) {
      await activeSound.setVolumeAsync(0)

      // unload async causes a clicking sound
      // await activeSound.unloadAsync()
      activeSoundsRef.current[string] = undefined
    } else {
      return
    }
  }

  const playSound = async (string: StringNames, fret: FretNumber) => {
    if (sounds[string] && fret in sounds[string]!) {
      const soundToPlay = sounds[string]?.[fret]
      const { sound: loadedSound } = await Audio.Sound.createAsync(soundToPlay as AVPlaybackSource)

      activeSoundsRef.current[string] = loadedSound

      await loadedSound.playAsync()
      loadedSound.setOnPlaybackStatusUpdate(async status => {
        if ((status as AVPlaybackStatusSuccess).didJustFinish) {
          await loadedSound.unloadAsync()
          activeSoundsRef.current[string] = undefined
        }
      })
      // Consider handling unload/release here if it's not managed globally
    } else {
      console.warn(`No sound file loaded for string ${string} and fret ${fret}`)
    }
  }

  return <SoundContext.Provider value={{ sounds, loadSounds, playSound, stopSound }}>{children}</SoundContext.Provider>
}

// Hook to use sound context
export const useSounds = () => useContext(SoundContext)
