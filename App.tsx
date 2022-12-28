import { Provider as PaperProvider, MD2DarkTheme, MD3DarkTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/screens/dashboard/home';
import { UnAuthLanding } from './src/screens/auth/unauth-landing';
const theme = {
  // Extend Material Design 2 theme

  ...MD3DarkTheme, // or MD2DarkTheme

  // Specify a custom property
  myOwnProperty: true,

  // Specify a custom nested property
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#48A8EF",
    onPrimary: "#FFFFFF",
    onBackground: "#FFFFFF"
  },
};

export type AppTheme = typeof theme;
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='landing'>
          <Stack.Screen component={UnAuthLanding} name="landing" options={{ headerShown: false }} />
          <Stack.Screen  component={Home} name="dashboard" navigationKey={"dashboard"} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

