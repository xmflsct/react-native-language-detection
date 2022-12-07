import { NativeModules, Platform } from 'react-native'

const detectLanguage = async (
  original: string
): Promise<{ language: string; confidence: number }[]> => {
  switch (Platform.OS) {
    case 'ios':
      return await NativeModules.RNLanguageDetectionModule.detection(original)
    case 'android':
      return (
        (await NativeModules.RNLanguageDetectionModule.detection(original)) as {
          language: string
          confidence: number
        }[]
      ).filter(lang => lang.language !== 'und')
    default:
      console.error('Platform not supported')
      return Promise.reject()
  }
}

export default detectLanguage
