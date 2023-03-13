import {StyleSheet, Image} from 'react-native';
import {colors} from '../../utils/settings';
import {Card, useTheme, Text} from 'react-native-paper';
import {FBox} from '../globals/fbox';
import {FontAwesome} from '@expo/vector-icons';
import React from "react";
import {ComingSoon, ScreenWidth} from "../../utils/constants";
import {useSelector} from "react-redux";
import {GlobalState} from "../../utils/store/global";
import {copyToClipboard} from "../../utils/clipboard";
import {toastMessage} from "../../utils/toast";

export default function UserProfileUpperTabs() {
    const theme = useTheme();
    const user = useSelector((state: GlobalState) => state.user);
    const onItemsTap=async()=>{
        await toastMessage({msg: ComingSoon});
    }
    return (
        <Card style={styles.card}>
            <Card.Content>
                <FBox style={styles.tabs}>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>
                                <Image source={require("../../../assets/icons/coins.svg")}
                                       style={{width: 18, height: 18}}/> Coins
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}}>+1</Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>
                                <Image source={require("../../../assets/icons/battery.svg")}
                                       style={{width: 18, height: 18}}/> Stamina
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}}>∞</Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>
                                <FontAwesome name='heart' size={18}/> Items
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}} onPress={onItemsTap}>0</Text>
                    </FBox>
                </FBox>
            </Card.Content>
            <FBox style={styles.cardWidthDivider}></FBox>

            <FBox style={{alignItems: "flex-start", marginLeft: 20, marginTop: 24}}>
                <FBox style={styles.tabLabel}>
                    <Text style={{...styles.lowerText, fontWeight: "bold", color: theme.colors.onPrimary}}>
                        <Image source={require("../../../assets/icons/battery.svg")}
                               style={{width: 18, height: 18}}/> Wallet Address
                    </Text>
                </FBox>
                <Text onPress={async () => {
                    await copyToClipboard({text: user.wallet ?? "", msg: `Wallet address copied successfully`})
                }} style={{
                    ...styles.lowerText,
                    fontSize: 12,
                    marginTop: 4,
                    color: theme.colors.onPrimary
                }}>{user.wallet ?? "N/A"}</Text>
            </FBox>
        </Card>
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
    cardWidthDivider: {
        width: ScreenWidth,
        backgroundColor: colors.textDark,
        opacity: 0.7,
        height: 1
    },
    upperLabelText: {
        opacity: 0.9,
        marginRight: 4,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'

    },
    lowerText: {
        display: 'flex',
        fontSize: 14,
    },
    tabText: {
        marginTop: 2,
        fontSize: 16,
    }
});