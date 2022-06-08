import { NativeModules, Platform } from 'react-native'

const detectLanguage = async (
  original: string
): Promise<{ detected: string }> => {
  switch (Platform.OS) {
    case 'ios':
      return await NativeModules.RNLanguageDetectionModule.detection(original)
    case 'android':
      return {detected: await NativeModules.RNLanguageDetectionModule.detection(original)}
    default:
      console.error('Platform not supported')
      return Promise.reject()
  }
}

export default detectLanguage
