// import "expo/build/Expo.fx";
import {Platform} from "react-native";
import {activateKeepAwake} from "expo-keep-awake";
import App from "./App";
import {createRoot} from "react-dom/client";
import {registerRootComponent} from 'expo';

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
// registerRootComponent(App)
if (__DEV__) {
    activateKeepAwake().then(() => {
        console.log("APP AWAKE")
        if (Platform.OS === "web") {
            const root = createRoot(
                document.getElementById("root") ?? document.getElementById("main")
            );
            root.render(<App/>);
            // registerRootComponent(App)
        } else {
            registerRootComponent(App);
        }
    });
} else {
    if (Platform.OS === "web") {
        const root = createRoot(
            document.getElementById("root") ?? document.getElementById("main")
        );
        root.render(<App/>);
        // registerRootComponent(App)
    } else {
        registerRootComponent(App);
    }
}

if (!__DEV__) {
    serviceWorkerRegistration.register({
        onUpdate: (register) => {
            console.log("Service worker updated")
        }
    })
}

