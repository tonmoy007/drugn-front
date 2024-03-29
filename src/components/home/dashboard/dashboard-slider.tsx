import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { FBox } from "../../globals/fbox";
import { colors, RootParamList } from "../../../utils/settings";
import { SliderLists } from "./slider-lists";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SideSwipe from 'react-native-sideswipe'
import moment from "moment";
import { userMedTime } from "../../../utils/functions/medicines";
import { useFetchMedsQuery } from "../../../api/okusuri";

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

export const DashboardSlider = ({ id }) => {
    const windowDimensions = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowDimension, setWindowDimension] = useState(windowDimensions)
    const [activeTime, setActiveTime] = useState<string>('morning');
    const [timeIDs, setTimeIDs] = useState<object>({
        morning: [],
        afternoon: [],
        night: [],
    });
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const today = moment().format('MM/DD');
    const dateName = moment().format('dddd').substring(0, 3);
    const { data: meds, isLoading, isFetching } = useFetchMedsQuery({ userId: id })

    useEffect(() => {
        if (meds?.medicines) {
            getAllUserMeds(meds.medicines)
        }
    }, [meds])

    function getAllUserMeds(meds) {
        const allMeds = userMedTime({ medicines: meds })
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

    const renderItem = ({ itemIndex, currentIndex, item, animatedValue }) => {
        const index = itemIndex;
        const key = itemIndex + currentIndex;
        return (
            <FBox style={{
                ...styles.card, width: windowDimension.width - 36
            }}
                key={`item-${index}${key}`}
            >
                <FBox style={{ padding: 0, margin: 0, flex: 1, width: '100%', justifyContent: 'center' }}>
                    {index == 0 && (
                        <FBox style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
                            <FBox style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontFamily: 'Montserrat_700Bold', marginBottom: 2 }}>今日 {today}</Text>
                                <Text style={{ fontFamily: 'Montserrat_700Bold', marginBottom: 5 }}>({dateName})</Text>
                                <Button icon={"plus-circle-outline"}
                                    labelStyle={{ fontSize: 30, fontWeight: "bold", lineHeight: 40 }}
                                    mode={"text"} textColor={colors.white}
                                    onPress={() => nav.navigate("addMedicine")}>薬を新規登録する</Button>
                            </FBox>
                        </FBox>
                    )}
                    {index == 1 && (
                        isLoading || isFetching ? <ActivityIndicator /> :
                            <SliderLists data={timeIDs[activeTime] ? [...timeIDs[activeTime]] : []} time={activeTime} />
                    )}

                </FBox>
            </FBox>
        );
    }
    const handleCarouselScrollEnd = (index) => {
        setCurrentIndex(index)
    }

    return (
        <FBox style={{ flex: 1, minHeight: windowDimension.height / 4 }}>
            <SideSwipe data={Array(2).fill(0)} index={currentIndex}
                itemWidth={windowDimension.width - 18}
                style={{ width: windowDimension.width }}
                threshold={windowDimension.width - 100}
                contentOffset={18}
                renderItem={renderItem} onIndexChange={handleCarouselScrollEnd} />
            <SliderPagination currentIndex={currentIndex} length={2}
                onClick={(i) => setCurrentIndex(i)} />
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