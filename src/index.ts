import { NativeModules, Platform } from 'react-native'

const detectLanguage = async (
  original: string
): Promise<{ language: string; confidence: number }[]> => {
  switch (Platform.OS) {
    case 'ios':
    case 'android':
      return await NativeModules.RNLanguageDetectionModule.detection(original)
    default:
      console.error('Platform not supported')
      return Promise.reject()
  }
}

export default detectLanguage
