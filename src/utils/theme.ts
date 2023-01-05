import {ThemeProp} from "react-native-paper/lib/typescript/types";
import {configureFonts, MD3DarkTheme} from "react-native-paper";
import {colors} from "./settings";
import {FontConfig} from "./font-config";

export const theme: ThemeProp = {
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