import {View} from "react-native";
import {colors} from "../../utils/settings";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "react-native-paper";

export const BackButton = (props: { path: string }) => {
    const theme=useTheme()
    return (
        <View style={{paddingLeft: 16}}>
            <Ionicons name={"chevron-back"} size={24}
                      onPress={() => {
                          const s: any = "landing"
                          if (window) {
                              window.location = `/${props.path}`
                          }
                      }
                      } color={theme.colors.onPrimary}/>
        </View>
    )
}