import { Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Button, ProgressBar, Text, useTheme } from "react-native-paper";
import { FBox } from "../../globals/fbox";
import { colors, RootParamList } from "../../../utils/settings";
import { SliderLists } from "./slider-lists";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SideSwipe from 'react-native-sideswipe'
import moment from "moment";
import { useSelector } from "react-redux";
import { GlobalState } from "../../../utils/store/global";
import { useFetchMedsMutation } from "../../../api/okusuri";
import { userMedTime } from "../../../utils/functions/medicines";
import { FlatList } from "react-native-gesture-handler";
import { useBalanceMutation } from "../../../api/account";
interface SliderPaginationProps {
    currentIndex: number,
    length: number,
    onClick: (index) => void
}

export const SliderPagination = (props: SliderPaginationProps) => {
    return (
        <FBox style={styles.dotContainer}>
            {Array(props.length).fill(0).map((item, index) => {
                return <TouchableOpacity onPress={() => props.onClick(index)} key={"page_" + index}
                    style={index == props.currentIndex ? { ...styles.dot, ...styles.dotActive } : styles.dot}></TouchableOpacity>
            })}
        </FBox>
    )
}

export const DashboardSlider = () => {
    const windowDimensions = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowDimension, setWindowDimension] = useState(windowDimensions)
    const [activeTime, setActiveTime] = useState<string>('morning');
    const [timeIDs, setTimeIDs] = useState<object>({
        morning: [],
        afternoon: [],
        night: [],
        any: []
    });
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const today = moment().format('MM/DD');
    const user = useSelector((state: GlobalState) => state.user)
    const [fetchMeds, { isLoading }] = useFetchMedsMutation()
    const [getBalance, { }] = useBalanceMutation()
    const [balance, setBalance] = useState<number>(0);

    const theme = useTheme();

    const barColors = {
        'Efficiency': theme.colors.scrim,
        'Luck': theme.colors.primary,
        'Comfort': '#FF0080',
        'Resilience': '#8a00c2'
    }
    const freeNFT = {
        id: 1, image: require('../../../../assets/icons/pills/blue_primary_eye.svg'), name: 'drug name',
        bars: [{ 'name': 'Efficiency', 'value': 0.8 }, { 'name': 'Luck', 'value': 0.8 },
        { 'name': 'Comfort', 'value': 0.4 }, { 'name': 'Resilience', 'value': 0.6 }]
    };

    useEffect(() => {
        if (user.id) {
            fetchMeds({ userId: user.id }).unwrap().then(async (res) => {
                if (res.error) {
                    // toastMessage({ msg: res.message });
                    return;
                }
                getAllUserMeds(res.medicines)
            }).catch(err => {
                console.log(err)
            })
            getBalance({ address: user.wallet }).unwrap().then(async (res) => {
                if (res.error) {
                    return;
                }
                setBalance(res.amount)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [user])


    async function getAllUserMeds(meds) {
        const allMeds = await userMedTime({ medicines: meds })
        setActiveTime(allMeds.activeTime)
        setTimeIDs(allMeds.timeIDs)
    }


    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window }) => {
                setWindowDimension(window);
            },
        );
        return () => subscription?.remove();
    });

    const handleFreeNFT = () => {
        if (balance === 0) {
            nav.navigate('freeNFT')
        }
    }
    const progressBar = ({ item }) => {

        return (<>
            <FBox style={{ flex: 1, margin: 5 }}>
                <Text style={{ fontSize: 12 }}>{item.name}</Text>
                <ProgressBar style={{ height: 5, borderRadius: 20 }} progress={item.value} color={barColors[item.name]} />
            </FBox>
        </>)
    }

    const renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => {
        const index = itemIndex;
        const key = itemIndex + currentIndex;
        return (
            <FBox style={{
                ...styles.card, width: windowDimension.width - 36
            }}
                key={`item-${index}${key}`}
            >
                <FBox style={{ padding: 0, margin: 0, flex: 1, width: '100%' }}>
                    {index === 0 &&
                        <FBox style={{
                            flex: 1, margin: 3, borderRadius: 10, borderWidth: 0
                        }} key={`${freeNFT.id}`}>
                            <TouchableOpacity style={{ padding: 10, opacity: balance > 0 ? 1 : 0.5 }}
                                onPress={handleFreeNFT}>
                                <FBox style={{ alignItems: 'center' }}>
                                    <Text style={{ ...styles.itemText, fontWeight: '700', marginBottom: 10 }}>#333333333</Text>
                                    <Image source={freeNFT.image} style={{ width: 100, height: 100 }} />
                                </FBox>
                                <FlatList
                                    data={freeNFT.bars}
                                    renderItem={progressBar}
                                    numColumns={2}
                                    keyExtractor={(freeNFT) => `${freeNFT.name}`}
                                />
                            </TouchableOpacity>
                        </FBox>
                    }
                    {index == 1 && (
                        <FBox style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
                            <FBox style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontFamily: 'Montserrat_700Bold', marginBottom: 5 }}>今日 {today}</Text>
                                <Button icon={"plus-circle-outline"}
                                    labelStyle={{ fontSize: 30, fontWeight: "bold", lineHeight: 40 }}
                                    mode={"text"} textColor={colors.white}
                                    onPress={() => nav.navigate("addMedicine")}>薬を新規登録する</Button>
                            </FBox>
                        </FBox>
                    )}
                    {index == 2 && (
                        <SliderLists data={timeIDs[activeTime]} time={activeTime} />
                    )}
                </FBox>
            </FBox >
        );
    }
    const handleCarouselScrollEnd = (index) => {
        setCurrentIndex(index)
    }

    return (
        <FBox style={{ flex: 1, minHeight: windowDimension.height / 4 }}>
            <SideSwipe data={Array(timeIDs[activeTime]?.length > 0 ? 3 : 2).fill(0)} index={currentIndex} itemWidth={windowDimension.width - 18}
                style={{ width: windowDimension.width }}
                threshold={windowDimension.width - 100}
                contentOffset={18}
                renderItem={renderItem} onIndexChange={handleCarouselScrollEnd} />
            <SliderPagination currentIndex={currentIndex} length={timeIDs[activeTime]?.length > 0 ? 3 : 2} onClick={(i) => setCurrentIndex(i)} />
        </FBox>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,.2)",
        overflow: "hidden",
        flex: 1,
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        marginRight: 18,
    },
    carousel: {
        flexGrow: 0,
        paddingRight: 18
    },
    dot: {
        backgroundColor: colors.textDark,
        width: 5,
        height: 5,
        borderRadius: 5,
        marginRight: 5
    },
    dotContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        marginTop: 5

    },
    dotActive: {
        backgroundColor: colors.white,
        width: 12,
        borderRadius: 10,
    },
    itemText: {
        textAlign: 'center'
    }
});