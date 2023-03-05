import {StyleSheet, Image} from 'react-native';
import {colors} from '../../utils/settings';
import {Card, useTheme, Text, Button} from 'react-native-paper';
import {FBox} from '../globals/fbox';
import React from "react";
import {ScreenWidth} from "../../utils/constants";

export default function UserProfileUpperSection() {
    const theme = useTheme();

    return (
        <Card style={styles.card}>
            <Card.Content>
                <FBox>
                    <FBox style={{flexDirection: "column", alignItems: "center", paddingBottom: 16}}>
                        <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>アカウント</Text>
                    </FBox>

                    <FBox style={{...styles.cardWidthDivider, marginBottom: 16, marginLeft: -20}}></FBox>
                    <FBox style={styles.rowContainer}>
                        <Image source={require("../../../assets/images/Face.svg")} style={{marginLeft: 10, width: 60, height: 60}}/>

                        <FBox style={{...styles.columnContainer, marginLeft: 10}}>
                            <Text style={{...styles.upperLabelText, color: theme.colors.onPrimary}}>Laura Burke</Text>
                            <Text style={{...styles.tabLabelSecondText, color: colors.textSemiDark}}>Token
                                Balance</Text>
                            <Text
                                style={{...styles.upperLabelText, marginTop: 4, color: theme.colors.onPrimary}}>300</Text>
                        </FBox>

                        <Button labelStyle={styles.label} icon={"history"} mode={"outlined"}
                                style={{marginRight: 5, ...styles.button}}
                                onPress={() => {
                                }}>
                            服薬履歴
                        </Button>
                    </FBox>
                </FBox>
            </Card.Content>

        </Card>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.grey_background,
        borderColor: colors.grayBorder,
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
    card: {
        backgroundColor: 'inherit',
    },
    rowContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    columnContainer: {
        flex: 1,
        alignItems: "flex-start",
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
        display: 'flex',
        fontWeight: "bold",
        fontSize: 16,
    },
    tabLabelSecondText: {
        display: 'flex',
        fontWeight: "normal",
        fontSize: 14,
        marginTop: 4
    },
    tabText: {
        marginTop: 2,
        fontSize: 16,
    }
});