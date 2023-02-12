import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnAuthLanding } from './src/screens/auth/unauth-landing';
import { colors, RootParamList } from "./src/utils/settings";
import { SignUpScreen } from "./src/screens/auth/sign-up";
import { SignInScreen } from "./src/screens/auth/sign-in";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import { StepOf } from "./src/components/globals/step-of";
import { OtpScreen } from "./src/screens/auth/otp";
import { linking } from "./src/utils/routes";
import { navTheme, theme } from "./src/utils/theme";
import { AccountComplete } from "./src/screens/auth/account-complete";
import { StoreRegistration } from "./src/screens/account/store-registration";
import { StoreRegistrationSuccess } from "./src/screens/account/store-registration-success";
import { Dashboard } from "./src/screens/dashboard";
import * as Font from "expo-font";
import { enableExperimentalWebImplementation, GestureHandlerRootView } from 'react-native-gesture-handler';
import AddMedicine from './src/screens/medicine/add';
import ManageMedicine from './src/screens/medicine/manage';
import { Provider as StoreProvider } from "react-redux";
import { globalStore } from "./src/utils/store/global";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import UserProfile from './src/screens/account/profie';
import { EditMedicine } from './src/screens/medicine/edit';
import { RecordMedicine } from './src/screens/medicine/record';
import { DeleteMedicine } from './src/screens/medicine/delete';

const Stack = createNativeStackNavigator<RootParamList>();
Ionicons.loadFont().catch(err => {
    console.error(err)
})
export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light,
    });
    Font.loadAsync({ IcoMoon: require('./assets/icomoon/icomoon.ttf') }).catch(err => {
        console.log(err)
    })
    if (!fontsLoaded) return <></>
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StoreProvider store={globalStore}>
                <PaperProvider theme={theme}>
                    <NavigationContainer linking={linking} theme={navTheme}>
                        <Stack.Navigator initialRouteName='signin' screenOptions={{
                            statusBarColor: colors.background,
                            headerStyle: { backgroundColor: colors.background },
                            headerTitleStyle: { fontFamily: "Montserrat_700Bold" },
                            animation: "fade_from_bottom",
                            headerBackImageSource: require("./assets/icons/back.svg")
                        }}>
                            <Stack.Screen component={Dashboard} name="dashboard" navigationKey={"dashboard"}
                                options={{ title: "Dashboard", headerShown: false }} />
                            <Stack.Screen component={UnAuthLanding} name="landing" options={{ headerShown: false }} />
                            <Stack.Screen name={"storeRegistration"} component={StoreRegistration}
                                options={{ headerShown: false, title: "Store Registration" }} />
                            <Stack.Screen name={"storeRegistrationSuccess"} component={StoreRegistrationSuccess}
                                options={{ headerShown: false, title: "Store registration success" }} />
                            <Stack.Screen component={SignUpScreen} name="signup" navigationKey={"signup"} options={{
                                title: "DrugNのアカウントを作る",
                                headerRight: () => {
                                    return (
                                        <StepOf total={2} current={1} />
                                    )
                                }
                            }} />
                            <Stack.Screen name={"otp"} component={OtpScreen} navigationKey={"otp"} options={{
                                title: "DrugNのアカウントを作る",
                                headerRight: () => {
                                    return <StepOf total={2} current={2} />
                                },
                            }} />
                            <Stack.Screen name={"accountComplete"} component={AccountComplete}
                                navigationKey={"account-complete"} options={{ headerShown: false }} />
                            <Stack.Screen name={"signin"} component={SignInScreen} options={{ title: "ログインする" }} />
                            <Stack.Screen component={AddMedicine} name="addMedicine" navigationKey={"addMedicine"}
                                options={{
                                    title: "薬を新規登録",
                                    headerRight: () => {
                                        return (
                                            <StepOf total={3} current={1} />
                                        )
                                    }
                                }} />
                            <Stack.Screen name={"editMedicine"} component={EditMedicine}
                                options={{ title: "薬の新規登録" }} />
                            <Stack.Screen name={"manageMedicine"} component={ManageMedicine}
                                options={{ title: "薬を飲む" }} />
                            <Stack.Screen name={"deleteMedicine"} component={DeleteMedicine}
                                options={{ title: "薬を飲む" }} />
                            <Stack.Screen component={RecordMedicine} name="recordMedicine" options={{ title: 'お薬を飲む' }} />
                            <Stack.Screen name={"profile"} component={UserProfile} options={{ title: "Profile Page" }} />

                        </Stack.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </StoreProvider>
        </GestureHandlerRootView>
    );
}

serviceWorkerRegistration.register()