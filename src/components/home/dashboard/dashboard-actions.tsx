import { FBox } from "../../globals/fbox";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { colors, RootParamList } from "../../../utils/settings";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { toastMessage } from "../../../utils/toast";

export const DashboardActions = () => {
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

    return (
        <FBox style={{ flexDirection: "row", padding: 18 }}>
            <Button contentStyle={styles.container} labelStyle={styles.label} icon={"history"} mode={"outlined"} style={{ marginRight: 5, ...styles.button }}
                onPress={() => nav.navigate("medicineHistory")}>
                履歴
            </Button>
            <Button icon={"pencil-box-outline"} labelStyle={styles.label} mode={"outlined"} style={{ marginRight: 5, ...styles.button }}
                onPress={() => nav.navigate("deleteMedicine")}>
                編集
            </Button>
            <Button icon={"plus-circle-outline"} labelStyle={styles.label} mode={"outlined"} onPress={() => nav.navigate("addMedicine")} style={{ ...styles.button }}>
                登録
            </Button>
        </FBox>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.textDark,
        borderColor: colors.white,
        flex: 1,
        borderRadius: 10,
    },
    label: {
        color: colors.white,
        margin: 0,
        padding: 0,
        fontSize: 14,
        lineHeight: 17,
        fontWeight: "bold"
    },
    container: {
    }
})