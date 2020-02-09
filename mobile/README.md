# Mobile application

Written in typescript and react native.

## Problems?

- Make sure you node_modules folder is up to date with `npm install`
- iOS problems? Make sure your pod dependencies are up to date with `cd ios` then `npm ios`
- Stackoverflow your problem
  - For example, JDK 13 is not supported by react-native fully. Using some features of react native for android causes error.

## Technology overview

We are using react native, so its very useful to understand react (**not** including react-dom) & react native. There are many tutorials available online, and the [react native website](https://facebook.github.io/react-native/) is a good starting point.

We are using (react-navigation](https://reactnavigation.org/) (**not** v4.x but **v5** aka. **next**) to allow navigation between different parts of the tab, for example the tab bar at the bottom, and the 'stack' navigation, where a new screen stacks onto your current screen. It will be very helpful to know how navigation works.

We are also using many different libraries to allow support for camera, and future functionality.

The react-native-elements component library is already installed to the app, and you can use them.

The code is typescript (a superset of javascript), which means you **can** just type javascript like normal. If you wanted to learn/ code in typescript to add type safety, you can do that and start using types in the code. It will only help you and other developers.

## Getting setup

- You need [node](http://nodejs.org/)
- You need either XCode and iOS simulator **or** Android Studio and Android Emulator set up following this [guide](https://facebook.github.io/react-native/docs/next/getting-started) **React native CLI Quickstart**, not **Expo CLI**.
- go into the `/react-native-app` and install dependencies `npm install` (this is needed because dependencies are not uploaded to gitlab)
- Run on android: npm run android
- Run on iOS:

  - execute `cd ios; pod install; cd..`
  - **Note:** After these dependencies change to because of further development, you might get dependency errors. First port of call is to run the above command.
  - npm run ios

- TODO add steps for running on a physical Android or Apple device

## Apollo Client
Setup [here](https://www.apollographql.com/docs/react/get-started/) and
[here](https://github.com/jaydenseric/apollo-upload-examples)
