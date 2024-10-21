import { useEffect, useRef, useState } from 'react'
import { BackHandler, View } from 'react-native'
import { WebView, WebViewNavigation } from 'react-native-webview'
import { TopBar } from '../components/TopBar'
import { useRouter } from 'expo-router'

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Miniapp</h1>
  <p id="token-id"></p>
  <script>
    const customValue = JSON.parse(window.ReactNativeWebView.injectedObjectJson()).myApp
   
    
    const pId = document.getElementById("token-id")
    pId.innerHTML = customValue.token
    window.ReactNativeWebView.postMessage(JSON.stringify(customValue))
  </script>
</body>
</html>
`

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
        injectedJavaScriptObject={{
          myApp: {
            token: '1234',
            user: 'John Doe'
          }
        }}
        onMessage={event => {
          console.log(event.nativeEvent.data)
        }}
        source={{ html }}
      />
    </View>
  )
}
