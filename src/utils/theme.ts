import {ThemeProp} from "react-native-paper/lib/typescript/types";
import {configureFonts, MD3DarkTheme} from "react-native-paper";
import {colors, ourTheme} from "./settings";
import {FontConfig} from "./font-config";

export const theme: ThemeProp = {
    // Extend Material Design 2 theme

    ...MD3DarkTheme, // or MD2DarkTheme
    roundness: 5,
    // Specify a custom nested property
    colors: {
        ...ourTheme.colors,
        primary: colors.primary,
        onPrimaryContainer: colors.primary,
        background: colors.background,
        onPrimary: colors.text,
        onBackground: colors.text,
        onSurface: colors.text,
        onSurfaceVariant: colors.textDark,

    },
    fonts: FontConfig,
    isV3: true
};
export type AppTheme = typeof theme;
export const navTheme = {
    dark: true,
    colors: {
        primary: theme.colors?.primary ?? colors.primary,
        background: theme.colors?.background ?? colors.background,
        card: theme.colors?.background ?? colors.background,
        text: theme.colors?.onSurface ?? colors.text,
        border: "transparent",
        notification: theme.colors?.onSurface ?? colors.text
    }
}