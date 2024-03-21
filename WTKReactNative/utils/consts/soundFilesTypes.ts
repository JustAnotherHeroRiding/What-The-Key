import { AVPlaybackSource } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

export type NoteType = 'note' | 'interval'

export type FretNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16

export type StringNames = 'E' | 'A' | 'D' | 'G' | 'B' | 'e'
export type SoundFilesType = {
  [key in StringNames]?: Partial<{
    [fret in FretNumber]?: any
  }>
}

// Define the structure of a single string's sounds
export type StringSounds = {
  [fret: number]: AVPlaybackSource
}

// Define the structure for all sounds, matching the SoundFiles structure
export type AllSounds = {
  [key in StringNames]?: { [fret in FretNumber]?: AVPlaybackSource }
}

// Define the shape of our context's value
export interface SoundContextType {
  sounds: AllSounds
  loadSounds: (soundFiles: SoundFilesType) => Promise<void>
}

export const soundFiles: SoundFilesType = {
  E: {},
  A: {},
  D: {},
  G: {
    0: require('../../assets/sounds/G/G0.wav'),
    1: require('../../assets/sounds/G/G1.wav'),
    2: require('../../assets/sounds/G/G2.wav'),
    3: require('../../assets/sounds/G/G3.wav'),
    4: require('../../assets/sounds/G/G4.wav'),
    5: require('../../assets/sounds/G/G5.wav'),
    6: require('../../assets/sounds/G/G6.wav'),
    7: require('../../assets/sounds/G/G7.wav'),
    8: require('../../assets/sounds/G/G8.wav'),
    9: require('../../assets/sounds/G/G9.wav'),
    10: require('../../assets/sounds/G/G10.wav'),
    11: require('../../assets/sounds/G/G11.wav'),
    12: require('../../assets/sounds/G/G12.wav'),
    13: require('../../assets/sounds/G/G13.wav'),
    14: require('../../assets/sounds/G/G14.wav'),
    15: require('../../assets/sounds/G/G15.wav'),
    16: require('../../assets/sounds/G/G16.wav'),
  },
  B: {
    0: require('../../assets/sounds/B/B0.wav'),
    1: require('../../assets/sounds/B/B1.wav'),
    2: require('../../assets/sounds/B/B2.wav'),
    3: require('../../assets/sounds/B/B3.wav'),
    4: require('../../assets/sounds/B/B4.wav'),
    5: require('../../assets/sounds/B/B5.wav'),
    6: require('../../assets/sounds/B/B6.wav'),
    7: require('../../assets/sounds/B/B7.wav'),
    8: require('../../assets/sounds/B/B8.wav'),
    9: require('../../assets/sounds/B/B9.wav'),
    10: require('../../assets/sounds/B/B10.wav'),
    11: require('../../assets/sounds/B/B11.wav'),
    12: require('../../assets/sounds/B/B12.wav'),
    13: require('../../assets/sounds/B/B13.wav'),
    14: require('../../assets/sounds/B/B14.wav'),
    15: require('../../assets/sounds/B/B15.wav'),
    16: require('../../assets/sounds/B/B16.wav'),
  },
  e: {
    0: require('../../assets/sounds/e/hE0.wav'),
    1: require('../../assets/sounds/e/hE1.wav'),
    2: require('../../assets/sounds/e/hE2.wav'),
    3: require('../../assets/sounds/e/hE3.wav'),
    4: require('../../assets/sounds/e/hE4.wav'),
    5: require('../../assets/sounds/e/hE5.wav'),
    6: require('../../assets/sounds/e/hE6.wav'),
    7: require('../../assets/sounds/e/hE7.wav'),
    8: require('../../assets/sounds/e/hE8.wav'),
    9: require('../../assets/sounds/e/hE9.wav'),
    10: require('../../assets/sounds/e/hE10.wav'),
    11: require('../../assets/sounds/e/hE11.wav'),
    12: require('../../assets/sounds/e/hE12.wav'),
    13: require('../../assets/sounds/e/hE13.wav'),
    14: require('../../assets/sounds/e/hE14.wav'),
    15: require('../../assets/sounds/e/hE15.wav'),
    16: require('../../assets/sounds/e/hE16.wav'),
  },
}
