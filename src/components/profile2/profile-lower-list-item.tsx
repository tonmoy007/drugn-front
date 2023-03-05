import {StyleSheet, Image} from 'react-native';
import {colors} from '../../utils/settings';
import {Card, useTheme, Text, Button, ProgressBar} from 'react-native-paper';
import {FBox} from '../globals/fbox';
import React from "react";
import {ScreenWidth} from "../../utils/constants";

export default function UserProfileLowerListItem({item}) {
    const theme = useTheme();

    return (
        <Card style={styles.card}>
            <FBox style={styles.rowContainer}>
                <FBox style={{...styles.columnContainer}}>
                    <Text style={{...styles.tabLabelSecondText, color: colors.white}}>{item.title}</Text>
                </FBox>
                {
                    item.progress != null ?
                        <FBox style={{flex: 1, margin: 5}}>
                            <Text style={{
                                textAlign: 'right',
                                color: theme.colors.primary,
                                fontSize: 14,
                                fontWeight: "bold"
                            }}>{item.progress * 100 + " %"}</Text>
                            <ProgressBar
                                style={{height: 5, borderRadius: 20}}
                                progress={item.progress}
                                color={theme.colors.primary}/>
                        </FBox> :
                        item.subTitle != null ?
                            <FBox style={{marginLeft: 10}}>
                                <Text style={{
                                    ...styles.tabLabelSecondText,
                                    color: colors.white
                                }}>
                                    {item.subTitle}</Text>
                            </FBox> : <FBox/>
                }
            </FBox>

            <FBox style={{...styles.cardWidthDivider, marginTop: 20, marginLeft: -20}}></FBox>


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
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
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
        fontSize: 16,
        marginTop: 4
    },
    tabText: {
        marginTop: 2,
        fontSize: 16,
    }
});