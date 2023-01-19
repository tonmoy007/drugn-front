import {MD3Type, MD3Typescale} from "react-native-paper/lib/typescript/types";
import {Platform} from "react-native";
import {configureFonts} from "react-native-paper";

const Config = {
    fontFamily: Platform.select({
        web: '"Montserrat_400Regular","Montserrat_700Bold",Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: "Montserrat_400Regular",

    }),
    letterSpacing: 0.5,
};
const config = configureFonts({isV3: true, config: Config})
config.bodyLarge.fontFamily = config.bodyMedium.fontFamily = config.bodySmall.fontFamily = 'Montserrat_700Bold'

export const FontConfig = config