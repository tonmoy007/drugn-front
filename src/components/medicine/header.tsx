
import { Text } from "react-native-paper";
import { StyleSheet } from 'react-native'
import { FBox } from "../globals/fbox";
import { colors } from "../../utils/settings";

export const RecordHeader = () => {

    return (
        <FBox style={{ ...styles.header, backgroundColor: colors.background2 }}>
            <Text>左にスワイプで薬を削除できます。</Text>
        </FBox>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
});