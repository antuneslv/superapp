import { Text, View } from 'react-native'

type TTopBar = {
  onGoBack: () => void
}

export function TopBar({ onGoBack }: TTopBar) {
  return (
    <View style={{backgroundColor: '#fff', height: 40, padding: 8, borderBottomWidth: 1}}>
      <Text onPress={onGoBack}>Voltar</Text>
    </View>
  )
}
