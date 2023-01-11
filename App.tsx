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
import {navTheme, theme} from "./src/utils/theme";
import {AccountComplete} from "./src/screens/auth/account-complete";
import {StoreRegistration} from "./src/screens/account/store-registration";
import {StoreRegistrationSuccess} from "./src/screens/account/store-registration-success";

const Stack = createNativeStackNavigator<RootParamList>();
export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light
    });


    return (
        <PaperProvider theme={theme}>
            <NavigationContainer linking={linking} theme={navTheme}>
                <Stack.Navigator initialRouteName='landing' screenOptions={{
                    statusBarColor: colors.background,
                    headerStyle: {backgroundColor: colors.background},
                    headerTitleStyle: {fontFamily: "Montserrat_700Bold"},
                    animation: "fade_from_bottom",
                    headerBackImageSource: require("./assets/icons/back.svg")
                }}>
                    <Stack.Screen component={Home} name="dashboard" navigationKey={"dashboard"}
                                  options={{title: "Dashboard", headerShown: false}}/>
                    <Stack.Screen component={UnAuthLanding} name="landing" options={{headerShown: false}}/>
                    <Stack.Screen name={"storeRegistration"} component={StoreRegistration}
                                  options={{headerShown: false, title: "Store Registration"}}/>
                    <Stack.Screen name={"storeRegistrationSuccess"} component={StoreRegistrationSuccess}
                                  options={{headerShown: false, title: "Store registration success"}}/>
                    <Stack.Screen component={SignUpScreen} name="signup" navigationKey={"signup"} options={{
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
                    <Stack.Screen name={"signin"} component={SignInScreen} options={{title: "Sign In"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

serviceWorkerRegistration.register()