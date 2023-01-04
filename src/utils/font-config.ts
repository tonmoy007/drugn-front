import {MD3Type, MD3Typescale} from "react-native-paper/lib/typescript/types";
import {Platform} from "react-native";

export const FontConfig = {
    fontFamily: Platform.select({
        web: '"Montserrat_400Regular",Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'sans-serif',
    }),
    letterSpacing: 0.5,
};