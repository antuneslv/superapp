import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        gap: 32,
        marginTop: 40,
        padding: 20
      }}
    >
      <Text>Superapp</Text>
      <Link href={'/miniapp'}>Abrir miniapp</Link>
    </View>
  )
}
