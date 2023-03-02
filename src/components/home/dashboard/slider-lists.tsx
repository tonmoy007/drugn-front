import {FBox} from "../../globals/fbox";
import {Divider, List, Text} from "react-native-paper";
import {colors, RootParamList} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";
import {LinearGradient} from "expo-linear-gradient";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export const SliderLists = ({data}) => {
    const navigation=useNavigation<NativeStackNavigationProp<RootParamList>>()
    return (
        <FBox style={{}}>
            {data.map((item, i) => {
                return item.active ? (
                    <TouchableOpacity key={`slider_list-item${i}`} onPress={() => {
                        navigation.navigate("manageMedicine")
                    }} activeOpacity={.9}>
                        <LinearGradient colors={['#47C3E8', '#48A8EF']} start={{x: 0, y: 1}} end={{x: 1, y: 0}} style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            shadowColor: "#444444",
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: .6,
                            shadowRadius: 5
                        }}>
                            <FBox style={{padding: 18, flexDirection: "row"}}>
                                <FBox style={{flex: 1}}>
                                    <Text variant={"bodyMedium"} style={{marginBottom: 10}}>{item.time}</Text>
                                    <CustomIcon size={28} color={colors.white} name={"pill-outlined"}/>
                                </FBox>
                                <FBox>
                                    <CustomIcon name={"sunrise"} color={"white"} size={56}/>
                                </FBox>
                                <FBox/>
                            </FBox>
                        </LinearGradient>
                    </TouchableOpacity>
                ) : (
                    <FBox key={`item-list-${i}`} style={{flex: 1, width: "100%"}}>
                        <List.Item key={`slider-item-${i}`} style={{marginHorizontal: 18}} onPress={() => {
                        }} titleStyle={{fontSize: 15, fontWeight: "700", lineHeight: 20}}
                                   left={(props) => <CustomIcon color={item.color ?? colors.white} name={"pill"}
                                                                size={16}/>} title={item.title}
                                   description={item.description + '\n' + item.time} descriptionNumberOfLines={2}
                                   descriptionStyle={{color: colors.white}}/>
                        {!item.active && i != data.length - 1 ? (<Divider key={`divider_${i}`}
                                                                          style={{
                                                                              backgroundColor: colors.white,
                                                                              width: "90%",
                                                                              marginLeft: '5%'
                                                                          }}/>) : null}

                    </FBox>
                )
            })}
        </FBox>
    )
}