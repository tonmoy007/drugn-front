import {Dimensions, StyleSheet} from "react-native";
import {useRef, useState} from "react";
import Carousel from 'react-native-anchor-carousel';
import {Button, Card, Divider, List, Text} from "react-native-paper";
import {FBox} from "../../globals/fbox";
import {colors} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,.2)",
        overflow:"hidden",
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
    const renderItem = ({item, index}) => {
        return (
            <FBox style={{
                ...styles.card,
                marginLeft: index == 0 ? 18 : 0
            }
            }>
                <FBox style={{padding: 0, margin: 0, flex:1}}>
                    {index == 0 && (
                        <FBox style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 20}}>
                            <FBox style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text>今日 11/30(水) 朝</Text>
                                <Button icon={"plus-circle-outline"} labelStyle={{fontSize: 18, fontWeight: "bold"}}
                                        mode={"text"} textColor={colors.white} onPress={() => {
                                }}>薬を新規登録する</Button>
                            </FBox>
                        </FBox>
                    )}
                    {index == 1 && (
                        <FBox style={{flex: 1,alignItems:"center",justifyContent:"center"}}>
                            {Array(3).fill(0).map((item, index) => {
                                return (
                                    <>
                                        {index != 0 && (<Divider  style={{backgroundColor: colors.white,width:"90%"}}/>)}
                                        <List.Item onPress={() => {
                                        }} titleStyle={{fontSize: 15, fontWeight: "700", lineHeight: 20}}
                                                   left={(props) => <CustomIcon color={colors.white} name={"pill"}
                                                                                size={24}/>} title={"１ダイアモックス錠250mg"}
                                                   description={"三和化学研究テキストテキスト"}/>
                                    </>
                                )
                            })}
                        </FBox>
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
        <FBox>
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
            />
            <SliderPagination currentIndex={currentIndex} length={data.length}/>
        </FBox>
    )
}