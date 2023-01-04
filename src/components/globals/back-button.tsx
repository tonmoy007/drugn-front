import {View} from "react-native";
import {colors, RootParamList} from "../../utils/settings";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export const BackButton = (props: { path: string }) => {
    const theme = useTheme()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    return (
        <View style={{paddingLeft: 16}}>
            <Ionicons name={"chevron-back"} size={24}
                      onPress={() => {
                          const s: any = "landing"
                          nav.navigate(s)
                      }
                      } color={theme.colors.onPrimary}/>
        </View>
    )
}