import {Provider as PaperProvider, MD3DarkTheme, configureFonts} from 'react-native-paper';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/screens/dashboard/home';
import {UnAuthLanding} from './src/screens/auth/unauth-landing';
import {colors, RootParamList} from "./src/utils/settings";
import {SignUpScreen} from "./src/screens/auth/sign-up";
import {SignInScreen} from "./src/screens/auth/sign-in";
import {MD3Type, ThemeProp} from "react-native-paper/lib/typescript/types";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import {BackButton} from "./src/components/globals/back-button";
import {StepOf} from "./src/components/globals/step-of";
import {OtpScreen} from "./src/screens/auth/otp";
import {FontConfig} from "./src/utils/font-config";


const theme: ThemeProp = {
    // Extend Material Design 2 theme

    ...MD3DarkTheme, // or MD2DarkTheme

    // Specify a custom nested property
    colors: {
        ...MD3DarkTheme.colors,
        primary: colors.primary,
        background: colors.background,
        onPrimary: colors.text,
        onBackground: colors.text,
        onSurface: colors.text,
        onSurfaceVariant: colors.textDark


    },
    fonts: configureFonts({isV3: true, config: FontConfig})
};

export type AppTheme = typeof theme;
const Stack = createNativeStackNavigator<RootParamList>();
const linking = {
    config: {
        screens: {
            landing: '/landing',
            dashboard: '/dashboard',
            signup: '/signup',
            signin: "/sign-in",
            otp: "/otp"
        }
    },
    prefixes: []
}
export default function App() {
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light
    });


    return (
        <PaperProvider theme={theme}>
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
                <Stack.Navigator initialRouteName='landing' screenOptions={{
                    statusBarColor: colors.background,
                    headerStyle: {backgroundColor: colors.background},
                    headerTitleStyle: {fontFamily: "Montserrat_700Bold"}
                }}>
                    <Stack.Screen component={UnAuthLanding} name="landing" options={{headerShown: false}}/>
                    <Stack.Screen component={Home} name="dashboard" navigationKey={"dashboard"}
                                  options={{title: "Dashboard"}}/>
                    <Stack.Screen component={SignUpScreen} name="signup" navigationKey={"signup"}
                                  options={{
                                      title: "Sign up",
                                      headerLeft: () => {
                                          return <BackButton path={"landing"}/>
                                      },
                                      headerRight: () => {
                                          return (
                                              <StepOf total={2} current={1}/>
                                          )
                                      }
                                  }}/>
                    <Stack.Screen name={"otp"} component={OtpScreen} navigationKey={"otp"} options={{
                        title: "Sign up",
                        headerRight: () => {
                            return <StepOf total={2} current={2}/>
                        },
                        headerLeft: () => <BackButton path={"landing"}/>
                    }}/>
                    <Stack.Screen name="signin" component={SignInScreen} options={{title: "Sign In"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

