import { useEffect, useRef, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { TopBar } from '../components/TopBar'
import { useRouter } from 'expo-router'

export default function Miniapp() {
  const webViewRef = useRef<WebView>(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const { back } = useRouter()

  function handleGoBack() {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack()

      return
    }

    back()
  }

  useEffect(() => {
    function backAction() {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack()

        return true
      }

      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [canGoBack])

  function handleNavigationStateChange(navState: WebViewNavigation) {
    setCanGoBack(navState.canGoBack)
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: 40
      }}
    >
      <TopBar onGoBack={handleGoBack} />

      <WebView
        ref={webViewRef}
        onNavigationStateChange={handleNavigationStateChange}
        source={{ uri: 'https://www.google.com/' }}
      />
    </View>
  )
}
