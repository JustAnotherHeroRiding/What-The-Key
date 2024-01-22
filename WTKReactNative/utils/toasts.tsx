import Toast from 'react-native-root-toast'

export function displayToast({ message }: { message: string }) {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: -40,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  })
}
