import {StyleSheet, Image} from 'react-native';
import {colors} from '../../utils/settings';
import {Card, useTheme, Text} from 'react-native-paper';
import {FBox} from '../globals/fbox';
import {FontAwesome} from '@expo/vector-icons';
import React from "react";
import {ScreenWidth} from "../../utils/constants";

export default function UserProfileUpperTabs() {
    const theme = useTheme();
    return (
        <Card style={styles.card}>
            <Card.Content>
                <FBox style={styles.tabs}>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText,color: theme.colors.onPrimary}}>
                                <Image source={require("../../../assets/icons/coins.svg")}
                                       style={{width: 18, height: 18}}/> Coins
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}}>+8.8</Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>
                                <Image source={require("../../../assets/icons/battery.svg")}
                                       style={{width: 18, height: 18}}/> Stamina
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}}>-2.4<Text
                            style={{fontSize: 16}}>Hp</Text></Text>
                    </FBox>
                    <FBox style={styles.cardDivider}></FBox>
                    <FBox style={styles.tabContainer}>
                        <FBox style={styles.tabLabel}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>
                                <FontAwesome name='heart' size={18}/> Items
                            </Text>
                        </FBox>
                        <Text style={{...styles.tabText, color: theme.colors.onPrimary}}>+1</Text>
                    </FBox>
                </FBox>
            </Card.Content>
            <FBox style={styles.cardWidthDivider}></FBox>

            <FBox style={{alignItems: "flex-start", marginLeft: 54, marginTop: 24}}>
                <FBox style={styles.tabLabel}>
                    <Text style={{...styles.lowerText, fontWeight: "bold", color: theme.colors.onPrimary}}>
                        <Image source={require("../../../assets/icons/battery.svg")}
                               style={{width: 18, height: 18}}/> Wallet Address
                    </Text>
                </FBox>
                <Text style={{
                    ...styles.lowerText,
                    fontSize: 12,
                    marginTop: 4,
                    color: theme.colors.onPrimary
                }}>NSHD9823E01HQW012H0H208113</Text>
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