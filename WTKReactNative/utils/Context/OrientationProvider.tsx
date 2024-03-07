import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

interface OrientationContext {
  isLandscape: boolean
  toggleOrientation: () => Promise<void>
}

const OrientationContext = createContext<OrientationContext | undefined>(undefined)

export const useOrientation = () => {
  const context = useContext(OrientationContext)
  if (context === undefined) {
    throw new Error('useOrientation must be used within an OrientationProvider')
  }
  return context
}

interface OrientationProviderProps {
  children: React.ReactNode
}

export const OrientationProvider = ({ children }: OrientationProviderProps) => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false)

  const toggleOrientation = useCallback(async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync()
    if (
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      setIsLandscape(false)
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
      setIsLandscape(true)
    }
  }, [])

  useEffect(() => {
    const updateOrientationState = async () => {
      const orientationInfo = await ScreenOrientation.getOrientationAsync()
      setIsLandscape(
        orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
      )
    }

    const subscription = ScreenOrientation.addOrientationChangeListener(() => {
      updateOrientationState()
    })

    updateOrientationState()

    return () => ScreenOrientation.removeOrientationChangeListener(subscription)
  }, [])

  return (
    <OrientationContext.Provider value={{ isLandscape, toggleOrientation }}>{children}</OrientationContext.Provider>
  )
}
