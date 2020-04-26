package com.mytelpay.cse;

import android.content.Context;
import android.content.Intent;
import android.support.multidex.MultiDex;
import android.support.annotation.Nullable;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactPackage;
import com.oblador.keychain.KeychainPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnative.photoview.PhotoViewPackage;

// import co.apptailor.googlesignin.RNGoogleSigninPackage;

import com.crashlytics.android.Crashlytics;
// import com.reactnativevietnam.RNNetworkStatePackage;

import io.invertase.firebase.RNFirebasePackage;

import org.reactnative.camera.RNCameraPackage;

import io.fabric.sdk.android.Fabric;

import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// import io.invertase.firebase.auth.RNFirebaseAuthPackage;
// import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;

import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.ocetnik.timer.BackgroundTimerPackage;
//import com.facebook.CallbackManager;
//import com.facebook.appevents.AppEventsLogger;

import com.reactnativenavigation.NavigationApplication;
import com.thanhpham.RNRealtimeGeoPackage;
import com.viettel.helper.Permissions.PermissionsPackage;
import com.viettel.helper.Utilities.RNUtilitiesPackage;
import com.viettel.helper.locations.LocationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

import java.util.Arrays;
import java.util.List;

import com.microsoft.codepush.react.CodePush;

import com.facebook.react.ReactInstanceManager;// <--- Import
import com.viettel.rninteractable.Interactable;

import io.invertase.firebase.links.RNFirebaseLinksPackage; // <-- Add this line
import com.viettel.zxingbarcode.BarcodePackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class MainApplication extends NavigationApplication {
//    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new VectorIconsPackage(),
                new Interactable(),
                new ImagePickerPackage(),
                new RNI18nPackage(),
                new FastImageViewPackage(),
                new RNFirebasePackage(),
                new RNFirebaseCrashlyticsPackage(),
                new RNFirebasePerformancePackage(),
                new RNFirebaseAnalyticsPackage(),
                new RNCameraPackage(),
                new KeychainPackage(),
                new LinearGradientPackage(),
                new MapsPackage(),
                new RNGooglePlacesPackage(),
                new LocationsPackage(),
                new RNUtilitiesPackage(),
                new ReactNativeFingerprintScannerPackage(),
                new DatePickerPackage(),
                new RNFetchBlobPackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseFirestorePackage(),
                new RNFirebaseNotificationsPackage(),
                new RNDeviceInfo(),
                new PermissionsPackage(),
                new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
                new BarcodePackage(),
                new ReactNativeContacts(),
                new BackgroundTimerPackage(),
                new PhotoViewPackage(),
                new RNCWebViewPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }


    public ReactInstanceManager getReactInstanceManager() {
        // CodePush must be told how to find React Native instance
        return getReactNativeHost().getReactInstanceManager();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // Fresco.initialize(this); // init for facebook Fresco
        Fabric.with(this, new Crashlytics());
//         setActivityCallbacks(new ActivityCallbacks() {
//             @Override
//             public void onActivityResult(int requestCode, int resultCode, Intent data) {
//                 mCallbackManager.onActivityResult(requestCode, resultCode, data);
//             }
//         });
//        AppEventsLogger.activateApp(this);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
     @Nullable
    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

}

