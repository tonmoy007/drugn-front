import { StyleSheet, Text } from 'react-native';
import { colors } from '../../utils/settings';
import { Card, useTheme } from 'react-native-paper';
import { CustomIcon } from '../../utils/custom-icon';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FBox } from '../globals/fbox';
import { useState } from 'react';
import SideSwipe from 'react-native-sideswipe'

const medSchedule = [
    {
        date: '11/28',
        date2: '(月)',
        breakfast: '10:00',
        lunch: '13:00',
        snack: '',
        dinner: '24:00',
    },
    {
        date: '11/29',
        date2: '(火)',
        breakfast: '10:00',
        lunch: '13:00',
        snack: '',
        dinner: 'x',
    },
    {
        date: '11/30',
        date2: '(水)',
        breakfast: '09:40',
        lunch: '',
        snack: '',
        dinner: '',
    },
    {
        date: '12/1',
        date2: '(木)',
        breakfast: '',
        lunch: '',
        snack: '',
        dinner: '',
    },
    {
        date: '11/2',
        date2: '(金)',
        breakfast: '',
        lunch: '',
        snack: '',
        dinner: '',
    },
    {
        date: '11/3',
        date2: '(土)',
        breakfast: '',
        lunch: '',
        snack: '',
        dinner: '',
    },
    {
        date: '11/4',
        date2: '(日)',
        breakfast: '',
        lunch: '',
        snack: '',
        dinner: '',
    },
]

export default function UserMedicineSchedule() {
    const [curCard, setCurCard] = useState<number>(0);
    const [width, setWidth] = useState(400);
    const maxCards = 3;
    const theme = useTheme();

    const handleCardSwitch = (nextCard) => {
        if (nextCard && maxCards - 1 > curCard) {
            setCurCard(curCard + 1)
            return;
        }
        if (!nextCard && curCard > 0) {
            setCurCard(curCard - 1)
        }
    }

    const ScheduleTabs = () => {
        return (
            <FBox style={{ width: width }}>
                {medSchedule.map((schedule, index) =>
                    <>
                        <FBox style={styles.tabs} key={'date-tabs'}>

                            <FBox key={'date'} style={{ ...styles.tabContainer, ...styles.tabDate }}>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.date}</Text>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.date2}</Text>
                            </FBox>
                            <FBox key={'breakfast'} style={{
                                ...styles.tabContainer, ...styles.tabContainerBody,
                                borderBottomRightRadius: index === medSchedule.length - 1 ? 10 : 0, borderBottomLeftRadius: index === medSchedule.length - 1 ? 10 : 0
                            }}>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.breakfast}</Text>
                            </FBox>
                            <FBox key={'lunch'} style={{
                                ...styles.tabContainer, ...styles.tabContainerBody,
                                borderBottomRightRadius: index === medSchedule.length - 1 ? 10 : 0, borderBottomLeftRadius: index === medSchedule.length - 1 ? 10 : 0
                            }}>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.lunch}</Text>
                            </FBox>
                            <FBox key={'snack'} style={{
                                ...styles.tabContainer, ...styles.tabContainerBody, backgroundColor: colors.textDarker,
                                borderBottomRightRadius: index === medSchedule.length - 1 ? 10 : 0, borderBottomLeftRadius: index === medSchedule.length - 1 ? 10 : 0
                            }}>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.snack}</Text>
                            </FBox>
                            <FBox key={'dinner'} style={{
                                ...styles.tabContainer, ...styles.tabContainerBody,
                                borderBottomRightRadius: index === medSchedule.length - 1 ? 10 : 0, borderBottomLeftRadius: index === medSchedule.length - 1 ? 10 : 0,
                                backgroundColor: schedule.dinner === 'x' ? colors.textInputIconBackground : colors.black
                            }}>
                                <Text style={{ ...styles.tabText, color: theme.colors.onPrimary }}>{schedule.dinner}</Text>
                            </FBox>

                        </FBox>
                    </>
                )}
                <Text style={styles.footer}>撮り直し</Text>
            </FBox>
        )
    }

    return (
        <Card theme={{ elevation: 1 }} style={styles.card}>
            <Card.Content style={{ paddingLeft: 5, paddingRight: 5 }}>

                <FBox style={styles.header}>
                    <MaterialIcons name='keyboard-arrow-left' onPress={() => handleCardSwitch(false)}
                        style={{ ...styles.headerText, color: theme.colors.onPrimary, opacity: curCard > 0 ? 1 : 0.4 }} size={28} />
                    <Text style={{ ...styles.headerText, color: theme.colors.onPrimary, fontSize: 18 }}>MEDICINE {curCard + 1}</Text>
                    <MaterialIcons name='keyboard-arrow-right' onPress={() => handleCardSwitch(true)}
                        style={{ ...styles.headerText, color: theme.colors.onPrimary, opacity: maxCards - 1 > curCard ? 1 : 0.4 }} size={28} />
                </FBox>


                <FBox style={styles.tabs} onLayout={(event) => {
                    setWidth(event.nativeEvent.layout.width);
                }}>
                    <FBox key={'date-header'} style={{ ...styles.tabContainer, ...styles.tabContainerHeader, marginRight: 20, marginLeft: 10 }}>
                    </FBox>
                    <FBox key={'breakfast-header'} style={{ ...styles.tabContainer, ...styles.tabContainerHeader, backgroundColor: colors.lightBlue }}>
                        <CustomIcon name='sunrise' size={30} color={theme.colors.onPrimary} />
                    </FBox>
                    <LinearGradient key={'lunch-header'} start={{ x: 0.5, y: 0.5 }} colors={['rgb(255, 230, 3)', 'rgb(240, 129, 26)', 'rgb(191, 83, 31)', 'rgb(136, 87, 3)']}
                        style={{ ...styles.tabContainer, ...styles.tabContainerHeader }}>
                        <CustomIcon name='sunrise' size={30} color={theme.colors.onPrimary} />
                    </LinearGradient>
                    <FBox key={'snack-header'} style={{ ...styles.tabContainer, ...styles.tabContainerHeader, backgroundColor: colors.textDarker }}>
                        <CustomIcon name='sunrise' size={30} color={theme.colors.onPrimary} />
                    </FBox>
                    <LinearGradient key={'dinner-header'} start={{ x: 0.5, y: 0.5 }} colors={['rgb(86, 74, 255)', 'rgb(101, 54, 255)', 'rgb(144, 0, 176)', 'rgb(144, 0, 176)', 'rgb(144, 0, 176)']}
                        style={{ ...styles.tabContainer, ...styles.tabContainerHeader }}>
                        <CustomIcon name='sunrise' size={30} color={theme.colors.onPrimary} />
                    </LinearGradient>
                </FBox>

                <SideSwipe data={Array(maxCards).fill(0)} index={curCard}
                    itemWidth={width}
                    style={{ width: '100%' }}
                    threshold={0}
                    contentOffset={0}
                    renderItem={ScheduleTabs} onIndexChange={(e) => setCurCard(e)} />
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background2,
        width: '100%',
        maxWidth: 400,
        margin: 'auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    headerText: {
        fontWeight: '500',
        marginBottom: 20
    },
    tabs: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        display: 'flex',
    },
    tabContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginRight: 5,
        justifyContent: 'center',
    },
    tabContainerHeader: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 45
    },
    tabDate: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight: 20,
        marginLeft: 10
    },
    tabContainerBody: {
        height: 40,
        backgroundColor: colors.black,
    },
    tabText: {
        marginTop: 2,
        fontSize: 16,
    },
    footer: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20,
        color: colors.lightBlue
    }
});