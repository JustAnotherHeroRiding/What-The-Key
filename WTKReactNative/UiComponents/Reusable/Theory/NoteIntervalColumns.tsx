import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, Text, View, Animated } from 'react-native'
import tw from '../../../utils/config/tailwindRN'
import { IntervalNames } from '../../../utils/formating/track-formating'
import { renderSeparator } from '../Common/FlatListHelpers'
import { useSounds } from '../../../utils/Context/SoundPlayer'
import { scaleNotesAndIntervals } from '../../../utils/consts/scales-consts-types'
import { FretNumber } from '../../../utils/consts/soundFilesTypes'
import { GestureHandlerRootView, TapGestureHandler, State, LongPressGestureHandler } from 'react-native-gesture-handler'

interface NoteIntervalColumnsProps {
  selectedOption: scaleNotesAndIntervals | null
  intervalToFret: Record<IntervalNames, FretNumber>
}

function NoteIntervalColumns({ selectedOption, intervalToFret }: NoteIntervalColumnsProps) {
  const { playSound } = useSounds()
  const opacities = Object.values(selectedOption?.notes ?? {}).map(() => new Animated.Value(1))

  // Update your onPressIn and onPressOut functions to take an index
  const onPressIn = (index: number) => {
    Animated.timing(opacities[index], {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = (index: number) => {
    Animated.timing(opacities[index], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  return (
    <GestureHandlerRootView style={tw.style(`flex justify-center items-center`)}>
      <FlatList
        horizontal={true}
        style={tw.style('flex-row')}
        contentContainerStyle={tw.style(``)}
        data={Object.values(selectedOption?.notes ?? {})}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => renderSeparator(2)}
        renderItem={({ item, index }) => (
          // Inside your renderItem function
          <LongPressGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                onPressOut(index)
              }
            }}
          >
            <TapGestureHandler
              numberOfTaps={1}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.BEGAN) {
                  onPressIn(index)
                  playSound('B', intervalToFret[selectedOption?.intervals[index] as IntervalNames])
                } else if (
                  nativeEvent.state === State.END ||
                  nativeEvent.state === State.CANCELLED ||
                  nativeEvent.state === State.FAILED
                ) {
                  onPressOut(index)
                }
              }}
            >
              <Animated.View
                style={[
                  tw.style(`px-2 py-1 justify-center items-center rounded-md border-cream border bg-beigeCustom `),
                  { opacity: opacities[index] },
                ]}
              >
                <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>{item}</Text>
                <Text style={tw.style(' text-xl', { fontFamily: 'figtree-bold' })}>
                  {selectedOption?.intervals[index]}
                </Text>
              </Animated.View>
            </TapGestureHandler>
          </LongPressGestureHandler>
        )}
      />
    </GestureHandlerRootView>
  )
}

export default NoteIntervalColumns
