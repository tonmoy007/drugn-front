import { colors } from "../../../utils/settings";
import { Text, useTheme } from "react-native-paper";
import { RecordMedManual } from "./manual";
import { RecordMed } from "./history";
import { FBox } from "../../../components/globals/fbox";
import { useState } from "react";
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { RecordHeader } from "../../../components/medicine/header";

export const RecordMedicine = ({ route, navigation }) => {
    const [auto, setAuto] = useState<boolean>(true)
    const theme = useTheme()

    return (
        <FBox style={styles.container}>
            <RecordHeader />
            {auto ?
                <FBox style={styles.tabContent}>
                    <RecordMed navigation={navigation} />
                </FBox>
                :
                <FBox style={styles.tabContent}>
                    <RecordMedManual navigation={navigation} />
                </FBox>
            }

            <FBox style={{ ...styles.tabContainer, backgroundColor: colors.background2 }}>
                <FBox style={{ ...styles.tab, borderTopWidth: auto ? 3 : 0, borderColor: theme.colors.primary }}>
                    <TouchableOpacity onPress={() => setAuto(true)}>
                        <Text style={{ ...styles.tabText }}>履歴から探す</Text>
                    </TouchableOpacity>
                </FBox>
                <FBox style={{ ...styles.tab, borderTopWidth: !auto ? 3 : 0, borderColor: theme.colors.primary }}>
                    <TouchableOpacity onPress={() => setAuto(false)}>
                        <Text style={{ ...styles.tabText }}>手動入力</Text>
                    </TouchableOpacity>
                </FBox>
            </FBox>
        </FBox>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    tabContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 70,
    },
    tabContent: {
        height: 'calc(100% - 70px)',
        paddingHorizontal: 20,
        paddingBottom: 70
    },
    tab: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontSize: 16
    }
});