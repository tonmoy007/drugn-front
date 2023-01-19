import {FBox} from "../../globals/fbox";
import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";
import {colors} from "../../../utils/settings";

export const DashboardActions = () => {
    return (
        <FBox style={{flexDirection: "row", padding: 18}}>
            <Button  contentStyle={styles.container} labelStyle={styles.label} icon={"history"} mode={"outlined"} style={{marginRight: 5, ...styles.button}}
                    onPress={() => {
                    }}>
                過去の履歴
            </Button>
            <Button icon={"pencil-box-outline"} labelStyle={styles.label} mode={"outlined"} style={{marginRight: 5, ...styles.button}}
                    onPress={() => {
                    }}>
                薬の編集
            </Button>
            <Button icon={"plus-circle-outline"} labelStyle={styles.label} mode={"outlined"} onPress={() => {
            }} style={{...styles.button}}>
                薬を新規登録
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
        padding:0,
        fontSize:14,
        lineHeight:17,
        fontWeight:"bold"
    },
    container: {
    }
})