import {Dimensions, StyleSheet, View, Text} from "react-native";
import {useEffect, useRef, useState} from "react";
import Carousel from 'react-native-anchor-carousel';
import {List} from "react-native-paper";
import {colors, RootParamList} from "../../utils/settings";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { FBox } from "../globals/fbox";
import { CustomIcon } from "../../utils/custom-icon";

const windowDimensions = Dimensions.get('window');

const scheduleData = [
    {
        title: '2 ダイアモックス錠250mg',
        description: <View><Text>三和化学研究テキストテキスト</Text><Text style={{marginTop:10}}>朝食前/2錠</Text></View>,
        active: true,
    },
    {
        title: '3 ダイアモックス錠250mg',
        description: <View><Text>三和化学研究テキストテキスト</Text><Text style={{marginTop:10}}>朝食前/2錠</Text></View>,
        color: colors.red
    },
    {
        title: '4 ダイアモックス錠250mg',
        description: <View><Text>三和化学研究テキストテキスト</Text><Text style={{marginTop:10}}>朝食前/2錠</Text></View>,
    }
]

export const MedicineSlider = () => {
    const carouselRef = useRef(null);
    const [windowDimension, setWindowDimension] = useState(windowDimensions);
    
      useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window}) => {
            setWindowDimension(window);
          },
        );
        return () => subscription?.remove();
      });

    const renderItem = ({index, key}) => {
        return (
            <FBox style={{
                ...styles.card,
                marginLeft: index == 0 ? 18 : 0
            }}
                  key={`item-${index}${key}`}
            >
                <FBox style={{padding: 0, margin: 0}}>
                <List.Item key={`slider-item-${index}`} style={styles.list} onPress={() => {
                        }} titleStyle={styles.title}
                                   left={(props) => <CustomIcon color={scheduleData[index].color ?? colors.white} name={"pill"}
                                                                size={16}/>} title={scheduleData[index].title}
                                   description={scheduleData[index].description}
                                   descriptionStyle={{color: colors.primary}}/>
                      
                </FBox>
            </FBox>
        );
    }

    return (
        <FBox style={{flex: 1}}>
            <Carousel
                ref={carouselRef}
                data={scheduleData}
                renderItem={renderItem}
                style={styles.carousel}
                inActiveScale={1}
                itemWidth={windowDimension.width * 0.8}
                containerWidth={windowDimension.width}
                separatorWidth={10}
                onScrollBegin={(e)=>console.log(e)}
            />
        </FBox>
    )
}

const styles = StyleSheet.create({
    card: {
        overflow: "hidden",
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        paddingTop:10,
        paddingBottom:10,
    },
    carousel: {
        flexGrow: 0,
    },
    list:{
        marginHorizontal: 18,
    },
    title:{
        fontWeight: "700",
        lineHeight: 20,
        color:colors.primary,
        fontSize: 14
    }
});