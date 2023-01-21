import {Dimensions, StyleSheet} from "react-native";
import {useRef, useState} from "react";
import Carousel from 'react-native-anchor-carousel';
import {Button, Card, Divider, List, Text} from "react-native-paper";
import {FBox} from "../../globals/fbox";
import {colors, RootParamList} from "../../../utils/settings";
import {SliderLists} from "./slider-lists";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
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
export const SliderPagination = ({currentIndex, length}) => {
    return (
        <FBox style={styles.dotContainer}>
            {Array(length).fill(0).map((item, index) => {
                return <FBox key={"page_" + index}
                             style={index == currentIndex ? {...styles.dot, ...styles.dotActive} : styles.dot}></FBox>
            })}
        </FBox>
    )
}
export const DashboardSlider = () => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = Array(5).fill(0)
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const renderItem = ({index, key}) => {
        return (
            <FBox style={{
                ...styles.card,
                marginLeft: index == 0 ? 18 : 0
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
                                <Button icon={"plus-circle-outline"} labelStyle={{fontSize: 30, fontWeight: "bold",lineHeight:40}}
                                        mode={"text"} textColor={colors.white} onPress={() => nav.navigate("addMedicine")}>薬を新規登録する</Button>
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
    const handleCarouselScrollEnd = (item, index) => {
        console.log("hello")
        setCurrentIndex(index)
        console.log(item, index)
    }

    return (
        <FBox style={{flex: 1}}>
            <Carousel
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                style={styles.carousel}
                itemWidth={windowWidth * 0.92}
                containerWidth={windowWidth}
                separatorWidth={18}
                onScrollEnd={handleCarouselScrollEnd}
                onScrollEndDrag={handleCarouselScrollEnd}
                inActiveOpacity={0.3}
                onScrollBeginDrag={handleCarouselScrollEnd}
            />
            <SliderPagination currentIndex={currentIndex} length={data.length}/>
        </FBox>
    )
}