import { StyleSheet, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { colors } from '../../utils/settings';
import { FBox } from '../globals/fbox';

export default function UserProfileHeader() {
    const theme = useTheme()
    return (
        <FBox style={styles.headerContainer}>
            <FBox style={{ ...styles.header, backgroundColor: theme.colors.primary }}>
                <FBox style={styles.headerTextContainer}>
                    <Text style={{ ...styles.headerText, color: theme.colors.onPrimary }}>2022/11/30 (月)</Text>
                    <Text style={{ ...styles.headerText, color: theme.colors.onPrimary }}>9:41</Text>
                </FBox>
                <FBox style={styles.profileContainer}>
                    <Image source={require("../../../assets/images/Face.svg")} style={styles.profilePic} />
                    <Text style={styles.name}>Laura Burke</Text>
                    <Image source={require("../../../assets/icons/first_nft.svg")} style={styles.headerSVG} />
                </FBox>
            </FBox>
        </FBox>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 140,
    },
    header: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    headerTextContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'monoscope'
    },
    profileContainer: {
        width: '94%',
        margin: 'auto',
        height: 140,
        position: 'absolute',
        top: 0
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        bottom: 0,
        position: 'absolute'
    },
    name: {
        fontSize: 22,
        fontWeight: '500',
        color: colors.lightBlue,
        position: 'absolute',
        bottom: 10,
        left: 90
    },
    headerSVG: {
        width: 80,
        height: 130,
        top: 0,
        right: 0,
        position: 'absolute'
    },
});