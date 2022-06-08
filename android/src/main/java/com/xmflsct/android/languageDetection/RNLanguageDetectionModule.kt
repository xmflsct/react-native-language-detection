package com.xmflsct.android.languageDetection

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.mlkit.nl.languageid.LanguageIdentification

class RNLanguageDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNLanguageDetectionModule"

    @ReactMethod fun detection(original: String, promise: Promise) {
        try {
            val languageIdentifier = LanguageIdentification.getClient()
            languageIdentifier.identifyLanguage(original)
                    .addOnSuccessListener { languageCode ->
                        if (languageCode == "und") {
                            promise.reject("Can't identify language.")
                        } else {
                            promise.resolve(languageCode)
                        }
                    }
                    .addOnFailureListener {
                        promise.reject("Detection failed.")
                    }
        } catch (e: Throwable) {
            promise.reject("Detection errored.", e)
        }
    }
}
