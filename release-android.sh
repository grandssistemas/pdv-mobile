cordova build --release android;
cp my-release-key.keystore platforms/android/build/outputs/apk;
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore platforms/android/build/outputs/apk/my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk pdv-mobile;
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/pdv-mobile.apk;
