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
  playSound: (
    sound: Sound | undefined,
    setSound: React.Dispatch<React.SetStateAction<Sound | undefined>>,
    string: StringNames,
    fret: FretNumber,
  ) => Promise<void>
}

export const soundFiles: SoundFilesType = {
  E: {
    0: require('../../assets/sounds/lowE/lowE0.wav'),
    1: require('../../assets/sounds/lowE/lowE1.wav'),
    2: require('../../assets/sounds/lowE/lowE2.wav'),
    3: require('../../assets/sounds/lowE/lowE3.wav'),
    4: require('../../assets/sounds/lowE/lowE4.wav'),
    5: require('../../assets/sounds/lowE/lowE5.wav'),
    6: require('../../assets/sounds/lowE/lowE6.wav'),
    7: require('../../assets/sounds/lowE/lowE7.wav'),
    8: require('../../assets/sounds/lowE/lowE8.wav'),
    9: require('../../assets/sounds/lowE/lowE9.wav'),
    10: require('../../assets/sounds/lowE/lowE10.wav'),
    11: require('../../assets/sounds/lowE/lowE11.wav'),
    12: require('../../assets/sounds/lowE/lowE12.wav'),
    13: require('../../assets/sounds/lowE/lowE13.wav'),
    14: require('../../assets/sounds/lowE/lowE14.wav'),
    15: require('../../assets/sounds/lowE/lowE15.wav'),
    16: require('../../assets/sounds/lowE/lowE16.wav'),
  },
  A: {
    0: require('../../assets/sounds/A/A0.wav'),
    1: require('../../assets/sounds/A/A1.wav'),
    2: require('../../assets/sounds/A/A2.wav'),
    3: require('../../assets/sounds/A/A3.wav'),
    4: require('../../assets/sounds/A/A4.wav'),
    5: require('../../assets/sounds/A/A5.wav'),
    6: require('../../assets/sounds/A/A6.wav'),
    7: require('../../assets/sounds/A/A7.wav'),
    8: require('../../assets/sounds/A/A8.wav'),
    9: require('../../assets/sounds/A/A9.wav'),
    10: require('../../assets/sounds/A/A10.wav'),
    11: require('../../assets/sounds/A/A11.wav'),
    12: require('../../assets/sounds/A/A12.wav'),
    13: require('../../assets/sounds/A/A13.wav'),
    14: require('../../assets/sounds/A/A14.wav'),
    15: require('../../assets/sounds/A/A15.wav'),
    16: require('../../assets/sounds/A/A16.wav'),
  },
  D: {
    0: require('../../assets/sounds/D/D0.wav'),
    1: require('../../assets/sounds/D/D1.wav'),
    2: require('../../assets/sounds/D/D2.wav'),
    3: require('../../assets/sounds/D/D3.wav'),
    4: require('../../assets/sounds/D/D4.wav'),
    5: require('../../assets/sounds/D/D5.wav'),
    6: require('../../assets/sounds/D/D6.wav'),
    7: require('../../assets/sounds/D/D7.wav'),
    8: require('../../assets/sounds/D/D8.wav'),
    9: require('../../assets/sounds/D/D9.wav'),
    10: require('../../assets/sounds/D/D10.wav'),
    11: require('../../assets/sounds/D/D11.wav'),
    12: require('../../assets/sounds/D/D12.wav'),
    13: require('../../assets/sounds/D/D13.wav'),
    14: require('../../assets/sounds/D/D14.wav'),
    15: require('../../assets/sounds/D/D15.wav'),
    16: require('../../assets/sounds/D/D16.wav'),
  },
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
