//
//  RNLanguageDetectionModule.swift
//  RNLanguageDetectionModule
//
//  Copyright © 2022 xmflsct. All rights reserved.
//

import NaturalLanguage

@objc(RNLanguageDetectionModule)
class RNLanguageDetectionModule: NSObject {
  @objc
  func detection(_ original: String, resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    let languageRecognizer = NLLanguageRecognizer()
    languageRecognizer.processString(original)

    let detected = languageRecognizer.dominantLanguage

    if detected?.rawValue != nil {
      resolve(["detected": detected?.rawValue])
    } else {
      reject("detection_error", "Language not recognized", nil)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
