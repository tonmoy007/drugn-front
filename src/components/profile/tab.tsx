import { StyleSheet, Image } from 'react-native';
import { colors } from '../../utils/settings';
import { Card, useTheme, Text } from 'react-native-paper';
import { FBox } from '../globals/fbox';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function UserProfileTabs() {
    const theme = useTheme();
    return (
        <Card theme={{ elevation: 1 }} style={styles.card}>
            <Card.Content>
                <FBox style={styles.tabs}>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{ ...styles.tabLabelText, color: theme.colors.onPrimary }}>
                                <Image source={require("../../../assets/icons/coins.svg")}
                                    style={{ width: 18, height: 18 }} /> Coins
                            </Text>
                        </FBox>
                        <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>+8.8</Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{ ...styles.tabLabelText, color: theme.colors.onPrimary }}>
                                <Image source={require("../../../assets/icons/battery.svg")} style={{ width: 18, height: 18 }} /> Stamina
                            </Text>
                        </FBox>
                        <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>-2.4<Text style={{ fontSize: 16 }}>Hp</Text></Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{ ...styles.tabLabelText, color: theme.colors.onPrimary }}>
                                <FontAwesome name='heart' size={18} /> Items
                            </Text>
                        </FBox>
                        <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>+1</Text>
                    </FBox>
                </FBox>
            </Card.Content>
        </Card >
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'inherit',
    },
    tabs: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative'
    },
    tabLabel: {
        flex: 1,
        flexDirection: 'row',
    },
    tabContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column"
    },
    cardDivider: {
        width: 1,
        backgroundColor: colors.textDark,
        opacity: 0.7,
        height: 80
    },
    tabLabelText: {
        opacity: 0.9,
        margin: '0px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'

    },
    tabText: {
        marginTop: 2,
        fontSize: 16,
    }
});