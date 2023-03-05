import {Provider as PaperProvider, Text} from 'react-native-paper';
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { theme} from "./src/utils/theme";
import * as Font from "expo-font";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as StoreProvider} from "react-redux";
import {globalPersistedStore, globalStore} from "./src/utils/store/global";
import {Ionicons} from "@expo/vector-icons";
import {RootSiblingParent} from 'react-native-root-siblings';
import {PersistGate} from "redux-persist/integration/react";
import {AppNavigation} from "./src/screens/app-navigation";
Ionicons.loadFont().catch(err => {
    console.error(err)
})
export default function App(props) {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light,
    });
    Font.loadAsync({IcoMoon: require('./assets/icomoon/icomoon.ttf')}).catch(err => {
        console.log(err)
    })
    if (!fontsLoaded) return <></>

    return (
        <RootSiblingParent>
            <GestureHandlerRootView style={{flex: 1}}>
                <StoreProvider store={globalStore}>
                    <PersistGate persistor={globalPersistedStore} loading={<Text>Loading...</Text>}>
                        <PaperProvider theme={theme}>
                            <AppNavigation/>
                        </PaperProvider>
                    </PersistGate>
                </StoreProvider>
            </GestureHandlerRootView>
        </RootSiblingParent>
    );
}

serviceWorkerRegistration.register()