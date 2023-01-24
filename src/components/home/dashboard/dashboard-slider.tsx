import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useRef, useState} from "react";
import {Button, Text} from "react-native-paper";
import {FBox} from "../../globals/fbox";
import {colors, RootParamList} from "../../../utils/settings";
import {SliderLists} from "./slider-lists";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import SideSwipe from 'react-native-sideswipe'

const windowDimensions = Dimensions.get('window');

const scheduleData = [
    {
        time: '今日 11/30(水) 朝',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: 'sunrise',
        active: true,
    },
    {
        time: '朝食前 / 2錠',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: '',
        active: false,
        color: '#FFA5FB'
    },
    {
        time: '朝食前 / 2錠',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: '',
        active: false,
    }
]

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
                                         style={index == props.currentIndex ? {...styles.dot, ...styles.dotActive} : styles.dot}></TouchableOpacity>
            })}
        </FBox>
    )
}

export const DashboardSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowDimension, setWindowDimension] = useState(windowDimensions)
    const data = Array(2).fill(0)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window}) => {
                setWindowDimension(window);
            },
        );
        return () => subscription?.remove();
    });

    const renderItem = ({itemIndex, currentIndex, item, animatedValue}) => {
        const index = itemIndex;
        const key = itemIndex + currentIndex;
        return (
            <FBox style={{
                ...styles.card, width: windowDimension.width - 36
            }}
                  key={`item-${index}${key}`}
            >
                <FBox style={{padding: 0, margin: 0, flex: 1, width: '100%'}}>
                    {index == 0 && (
                        <FBox style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 20}}>
                            <FBox style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{fontFamily: 'Montserrat_700Bold', marginBottom: 5}}>今日 11/30(水)
                                    朝</Text>
                                <Button icon={"plus-circle-outline"}
                                        labelStyle={{fontSize: 30, fontWeight: "bold", lineHeight: 40}}
                                        mode={"text"} textColor={colors.white}
                                        onPress={() => nav.navigate("addMedicine")}>薬を新規登録する</Button>
                            </FBox>
                        </FBox>
                    )}
                    {index == 1 && (
                        <SliderLists data={scheduleData}/>
                    )}
                </FBox>
            </FBox>
        );
    }
    const handleCarouselScrollEnd = (index) => {
        console.log("hello")
        setCurrentIndex(index)
        console.log(index)
    }

    return (
        <FBox style={{flex: 1}}>
            <SideSwipe data={data} index={currentIndex} itemWidth={windowDimension.width - 18}
                       style={{width: windowDimension.width}}
                       threshold={windowDimension.width - 100}
                       contentOffset={18}
                       renderItem={renderItem} onIndexChange={handleCarouselScrollEnd}/>
            <SliderPagination currentIndex={currentIndex} length={data.length} onClick={(i) => setCurrentIndex(i)}/>
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
    }
});