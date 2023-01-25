import { StyleSheet } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import { colors } from "../../utils/settings";
import { FBox } from "./fbox";
import * as Sharing from 'expo-sharing';

export const DownloadShare = () => {
    const theme = useTheme()

    const handleShare = async () => {
        if (await Sharing.isAvailableAsync())
            Sharing.shareAsync('https://www.google.com', { dialogTitle: 'Google' })
    }

    return (
        <>
            <FBox style={styles.container}>
                <FBox style={styles.container}>
                    <FBox style={styles.icon}>
                        <IconButton icon={'share-circle'} size={30} iconColor={theme.colors.onPrimary}
                            onPress={handleShare} />
                    </FBox>

                    <FBox style={styles.icon}>
                        <IconButton icon={'cloud-download'} size={30} iconColor={theme.colors.onPrimary} />
                    </FBox>

                </FBox>
                <Button icon={"help"} labelStyle={[styles.text, { fontSize: 16 }]} mode={"outlined"}
                    style={styles.photoPreview} onPress={() => { }}>各種アイコンガイド
                </Button>
            </FBox>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: colors.background2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    photoPreview: {
        alignSelf: 'flex-end',
        fontSize: 16,
        backgroundColor: colors.background2,
        borderRadius: 20,
        border: 0,
        padding: 0
    },
    text: {
        justifyContent: 'center',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    }
});