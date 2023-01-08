import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/screens/dashboard/home';
import {UnAuthLanding} from './src/screens/auth/unauth-landing';
import {colors, RootParamList} from "./src/utils/settings";
import {SignUpScreen} from "./src/screens/auth/sign-up";
import {SignInScreen} from "./src/screens/auth/sign-in";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import {StepOf} from "./src/components/globals/step-of";
import {OtpScreen} from "./src/screens/auth/otp";
import {linking} from "./src/utils/routes";
import {theme} from "./src/utils/theme";
import {AccountComplete} from "./src/screens/auth/account-complete";
import {Provider as StoreProvider} from "react-redux";
import {globalStore} from "./src/utils/store/global";
import {useEffect} from "react";

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light
    });
    useEffect(() => {
        console.log("")
    }, [fontsLoaded])

    return (
        <PaperProvider theme={theme}>
            <StoreProvider store={globalStore}>
                <NavigationContainer linking={linking} theme={{
                    dark: true,
                    colors: {
                        primary: theme.colors?.primary ?? colors.primary,
                        background: theme.colors?.background ?? colors.background,
                        card: theme.colors?.background ?? colors.background,
                        text: theme.colors?.onSurface ?? colors.text,
                        border: "transparent",
                        notification: theme.colors?.onSurface ?? colors.text
                    }
                }}>
                    <Stack.Navigator initialRouteName={globalStore.getState().user.loggedIn ? "dashboard" : "landing"}
                                     screenOptions={{
                                         statusBarColor: colors.background,
                                         headerStyle: {backgroundColor: colors.background},
                                         headerTitleStyle: {fontFamily: "Montserrat_700Bold"},
                                         animation: "flip",
                                         headerBackImageSource: require("./assets/icons/back.svg")
                                     }}>
                        <Stack.Screen component={UnAuthLanding} name="landing" options={{headerShown: false}}/>
                        <Stack.Screen component={Home} name="dashboard" navigationKey={"dashboard"}
                                      options={{title: "Dashboard"}}/>
                        <Stack.Screen component={SignUpScreen} name="signup" navigationKey={"signup"}
                                      options={{
                                          title: "Sign up",
                                          headerRight: () => {
                                              return (
                                                  <StepOf total={2} current={1}/>
                                              )
                                          }
                                      }}/>
                        <Stack.Screen name={"otp"} component={OtpScreen} navigationKey={"otp"} options={{
                            title: "Sign up ",
                            headerRight: () => {
                                return <StepOf total={2} current={2}/>
                            },
                        }}/>
                        <Stack.Screen name={"accountComplete"} component={AccountComplete}
                                      navigationKey={"account-complete"} options={{headerShown: false}}/>
                        <Stack.Screen name="signin" component={SignInScreen} options={{title: "Sign In"}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </StoreProvider>
        </PaperProvider>
    );
}

serviceWorkerRegistration.register()