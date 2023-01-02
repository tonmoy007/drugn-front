import {Provider as PaperProvider, MD2DarkTheme, MD3DarkTheme, Text} from 'react-native-paper';
import {View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Home} from './src/screens/dashboard/home';
import {UnAuthLanding} from './src/screens/auth/unauth-landing';
import {colors, RootParamList} from "./src/utils/settings";
import {SignUpScreen} from "./src/screens/auth/sign-up";
import {SignInScreen} from "./src/screens/auth/sign-in";
import {ThemeProp} from "react-native-paper/lib/typescript/types";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_300Light,
    Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import {BackButton} from "./src/components/globals/back-button";

const theme: ThemeProp = {
    // Extend Material Design 2 theme

    ...MD3DarkTheme, // or MD2DarkTheme

    // Specify a custom nested property
    colors: {
        ...MD3DarkTheme.colors,
        primary: colors.primary,
        background: colors.background,
        backgroundColor: colors.background,
        onPrimary: colors.text,
        onBackground: colors.text,
        text: colors.text,
        onSurface: colors.text,
        onSurfaceVariant: colors.textDark


    },
};

export type AppTheme = typeof theme;
const Stack = createNativeStackNavigator<RootParamList>();
const linking = {
    config: {screens: {landing: '/landing', dashboard: '/dashboard', signup: '/signup', signin: "/sign-in"}},
    prefixes: []
}
export default function App() {
    let [fontsLoaded] = useFonts({
                                     Montserrat_400Regular, Montserrat_100Thin, Montserrat_700Bold, Montserrat_300Light
                                 });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer linking={linking} theme={{
                dark: true,
                colors: {
                    primary: theme.colors?.primary ?? colors.primary,
                    background: theme.colors?.background ?? colors.background,
                    card: theme.colors?.primaryContainer ?? colors.background,
                    text: theme.colors?.onPrimary ?? colors.text,
                    border: "transparent",
                    notification: theme.colors?.onPrimary ?? colors.text
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
                                              <View style={{paddingHorizontal: 20}}>
                                                  <Text>1 / 2</Text>
                                              </View>
                                          )
                                      }
                                  }}/>
                    <Stack.Screen name="signin" component={SignInScreen} options={{title: "Sign In"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

