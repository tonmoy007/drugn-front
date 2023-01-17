import {Dimensions, StyleSheet} from "react-native";
import {useRef, useState} from "react";
import Carousel from 'react-native-anchor-carousel';
import {Button, Card, Text} from "react-native-paper";
import {FBox} from "../../globals/fbox";
import {colors} from "../../../utils/settings";

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,.2)",
        flex: 1,
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center"
    },
    carousel: {
        flexGrow: 0,
        height: windowHeight * .4,
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
        height: 5,
        borderRadius: 10,
        marginRight: 5
    }
});
export const SliderPagination = ({currentIndex, length}) => {
    return (
        <FBox style={styles.dotContainer}>
            {Array(length).fill(0).map((item, index) => {
                return <FBox key={"page_" + index} style={index == currentIndex ? styles.dotActive : styles.dot}></FBox>
            })}
        </FBox>
    )
}
export const DashboardSlider = () => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = Array(10).fill(0)
    const renderItem = ({item, index}) => {
        return (
            <Card elevation={1} style={{
                ...styles.card,
                marginLeft: index == 0 ? 18 : 0
            }
            }>
                <Card.Content>
                    {index == 0 && (
                        <FBox style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <FBox style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text>今日 11/30(水) 朝</Text>
                                <Button icon={"plus-circle-outline"} labelStyle={{fontSize: 18, fontWeight: "bold"}}
                                        mode={"text"} textColor={colors.white} onPress={()=>{}}>薬を新規登録する</Button>
                            </FBox>
                        </FBox>
                    )}
                </Card.Content>
            </Card>
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
                itemHeight={windowHeight * .4}
                onScrollEnd={handleCarouselScrollEnd}
                onScrollEndDrag={handleCarouselScrollEnd}
                inActiveOpacity={0.3}
            />
            <SliderPagination currentIndex={currentIndex} length={data.length}/>
        </FBox>
    )
}