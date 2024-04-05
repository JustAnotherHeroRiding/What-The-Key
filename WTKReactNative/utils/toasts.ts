import Toast from 'react-native-root-toast'

type ToastBackgroundColor = 'error' | 'success' | 'default'

export function displayToast({
  message,
  backgroundColor = 'default',
}: {
  message: string
  backgroundColor?: ToastBackgroundColor
}) {
  const getBgColor = () => {
    if (backgroundColor === 'error') {
      return '#ff0000'
    } else if (backgroundColor === 'success') {
      return '#22c55e'
    } else {
      return '#262626'
    }
  }

  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: -40,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: getBgColor(),
  })
}
