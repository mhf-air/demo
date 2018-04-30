# [how to sign an Android app](https://developer.android.com/studio/publish/app-signing)

  keytool -genkey -v -keystore my-release-key.jks
  -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using

  keytool -importkeystore -srckeystore my-release-key.jks -destkeystore my-release-key.jks -deststoretype pkcs12
