import "expo/build/Expo.fx";
import {Platform} from "react-native";
import {activateKeepAwake} from "expo-keep-awake";
import App from "./App";
import {createRoot} from "react-dom/client";
import registerRootComponent from 'expo/build/launch/registerRootComponent';

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
    if (Platform.OS === "web" && !__DEV__) {
        const root = createRoot(
            document.getElementById("root") ?? document.getElementById("main")
        );
        root.render(<App/>);
        // registerRootComponent(App)
    } else {
        registerRootComponent(App);
    }
}

